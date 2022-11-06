import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs'
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { TokenService } from '../../../common/services/token/token.service';
import { RegisterDto } from '../../dtos/register.dto';
import { USER_STATES } from '../../../common/config/states';
import { RegisterAccountDto } from '../../dtos/register-account.dto';
import { IRequestRegisterAccount } from '../../interfaces/request-register-account.interface';
import { LoginDto } from '../../dtos/login.dto';
import { User } from 'src/user/entities/user.entity';
import { Account } from 'src/user/entities/account.entity';
import { UserAccount } from 'src/user/entities/useraccount.entity';
import { generatePassword } from 'src/common/utils/helpers';
import { EmailService } from 'src/common/services/email/email.service';

@Injectable()
export class UserService {

    urlCpanel: string = process.env.URL_CPANEL

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        @InjectRepository(UserAccount)
        private userAccountRepository: Repository<UserAccount>,
        private tokenService: TokenService,
        private httpService: HttpService,
        private emailService: EmailService
    ) {

    }

    async register(params: RegisterDto) {
        try {

            const url = `${this.urlCpanel}/api/accounts/get-account?userid=${params.user}`
            const response = await firstValueFrom(this.httpService.get(url))
            if(response.data.user){
                throw new HttpException('Ya existe un jugador con este usuario', HttpStatus.BAD_REQUEST)
            }

            const user = new User()
            user.email = params.email;
            user.password = bcrypt.hashSync(params.password, bcrypt.genSaltSync(10));
            user.state = USER_STATES.ENABLED;
            const request: IRequestRegisterAccount = {
                email: user.email,
                last_ip:params.ip,
                sex:params.genre,
                user_pass: params.password,
                userid: params.user,
            }
            await this.userRepository.insert(user)
            return this.registerUserRo(request, user.idUser)
        } catch (error) {
            throw error            
        }
    }

    async registerAccount(params: RegisterAccountDto, req: any) {
        const { user: { email, idUser } } = req

        const request: IRequestRegisterAccount = {
            ...params,
            email: email.toLowerCase()
        }
        return this.registerUserRo(request, idUser)
    }

    async registerUserRo(request: IRequestRegisterAccount, idUser: number){
        try {
            const url = `${this.urlCpanel}/api/accounts/register`
            const response = await firstValueFrom(this.httpService.post(url, request))
            const account = new Account()
            account.genre = request.sex;
            account.ragnarokId = response.data.idUser;
            account.user = request.userid;
            await this.accountRepository.insert(account)
            const userAccount = new UserAccount()
            userAccount.idUser = idUser
            userAccount.idAccount = account.idAccount;
            return await this.userAccountRepository.insert(userAccount)
        } catch (error) {
            throw error            
        }
    }

    async login(params: LoginDto) {
        const { email, password } = params
        try {
            const userData = await this.userRepository.findOne({ select: { email: true, password: true, idUser: true, state: true }, where: { email } })
            if (userData) {
                if (bcrypt.compareSync(password, userData.password)) {
                    if (userData.state == USER_STATES.ENABLED) {
                        const token = this.tokenService.createToken(userData)
                        const response = {
                            accessToken: token,
                            user: {
                                email: userData.email,
                            }
                        }
                        return response
                    } else {
                        throw new HttpException('Usuario deshabilitado', HttpStatus.BAD_REQUEST)
                    }
                } else {
                    throw new HttpException('Contraseña inválida', HttpStatus.BAD_REQUEST)
                }
            } else {
                throw new HttpException('Email inválido', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getInfoCpanel() {
        const url = `${this.urlCpanel}/api/accounts/status`
        try {
            const response = await firstValueFrom(this.httpService.get(url))
            const { connectedUsers } = response.data
            const totalUsers = await this.userRepository.count()
            const totalAccounts = await this.accountRepository.count()
            return {
                connectedUsers,
                totalUsers,
                totalAccounts
            }
        } catch (error) {

        }
    }

    async getInfoAccount(req: any) {
        const { user: { email, idUser } } = req
        // const url = `${this.urlCpanel}/api/accounts/get-account?email=${email}`
        // return lastValueFrom(this.httpService.get(url))
        // { select: { idUser: true, idAccount: true, idUserAccount: true }, where: { idUser: idUser }, relations: { idAccount: true } }
        return await this.userAccountRepository.find({ select: { idUser: true, idAccount: true, idUserAccount: true }, where: { idUser: idUser }, relations: { idAccount: true } })
    }

    async recoveryPassword(req: any){
        const { user: { email, idUser } } = req
        try {
            const userDb = this.userRepository.findOne({where: {idUser}})
            if(userDb){
                const newPassword = generatePassword()
                this.userRepository.update({idUser}, {password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))})
                this.emailService.sendEmailWelcomeUser
                
            } else {
                throw new HttpException('Usuario inválido', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw error
        }
    }
}

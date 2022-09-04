import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs'
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { User } from '../../entities/user.entity';
import { Account } from '../../entities/account.entity';
import { UserAccount } from '../../entities/useraccount.entity';
import { TokenService } from '../../../services/token/token.service';
import { RegisterDto } from '../../dtos/register.dto';
import { USER_STATES } from '../../../config/states';
import { RegisterAccountDto } from '../../dtos/register-account.dto';
import { IRequestRegisterAccount } from '../../interfaces/request-register-account.interface';
import { LoginDto } from '../../dtos/login.dto';

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
        private httpService: HttpService
    ) {

    }

    register(params: RegisterDto) {
        const user = new User()
        user.email = params.email;
        user.password = bcrypt.hashSync(params.password, bcrypt.genSaltSync(10));
        user.state = USER_STATES.ENABLED;
        return this.userRepository.insert(user)
    }

    async registerAccount(params: RegisterAccountDto, req: any) {
        const { user: { email, idUser } } = req

        const url = `${this.urlCpanel}/api/accounts/register`

        const request: IRequestRegisterAccount = {
            ...params,
            email: email.toLowerCase()
        }

        const response = await firstValueFrom(this.httpService.post(url, request))
        const account = new Account()
        account.genre = params.sex;
        account.ragnarokId = response.data.idUser;
        account.user = params.userid;
        await this.accountRepository.insert(account)
        const userAccount = new UserAccount()
        userAccount.idUser = idUser
        userAccount.idAccount = account.idAccount;
        return await this.userAccountRepository.insert(userAccount)
    }

    async login(params: LoginDto) {
        const { email, password } = params
        try {
            // select: { email: true, password: true, idUser: true, state: true }, where: { email } 
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

    getInfoCpanel() {
        const url = `${this.urlCpanel}/api/accounts/status`
        return firstValueFrom(this.httpService.get(url))
    }

    async getInfoAccount(req: any) {
        const { user: { email, idUser } } = req
        // const url = `${this.urlCpanel}/api/accounts/get-account?email=${email}`
        // return lastValueFrom(this.httpService.get(url))
        // { select: { idUser: true, idAccount: true, idUserAccount: true }, where: { idUser: idUser }, relations: { idAccount: true } }
        const userAccount = await this.userAccountRepository.find({ select: { idUser: true, idAccount: true, idUserAccount: true }, where: { idUser: idUser }, relations: { idAccount: true } })
        return userAccount
    }
}

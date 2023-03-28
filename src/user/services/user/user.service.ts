import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs';
import { TokenService } from '../../../common/services/token/token.service';
import { RegisterDto } from '../../dtos/register.dto';
import { USER_STATES } from '../../../config/states';
import { RegisterAccountDto } from '../../dtos/register-account.dto';
import { IRequestRegisterAccount } from '../../interfaces/request-register-account.interface';
import { LoginDto } from '../../dtos/login.dto';
import { UserEntity } from '@entities/user';
import { AccountEntity } from '@entities/account';
import { generatePassword } from '../../../common/utils/helpers';
import { CpanelService } from '../../../common/services/cpanel/cpanel.service';
import { IRequestRegisterLogin } from '../../../common/interfaces/request-register-login.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
    private tokenService: TokenService,
    private cpanelService: CpanelService,
  ) {}

  async register(params: RegisterDto) {
    try {
      const data = await this.cpanelService.getLogin(params.user);

      if (data.user) {
        throw new HttpException(
          'Ya existe un jugador con este usuario',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = new UserEntity();
      user.email = params.email;
      user.password = bcrypt.hashSync(params.password, bcrypt.genSaltSync(10));
      user.state = USER_STATES.ENABLED;
      const request: IRequestRegisterAccount = {
        email: user.email,
        last_ip: params.ip,
        sex: params.genre,
        user_pass: params.password,
        userid: params.user,
      };
      await this.userRepository.insert(user);
      return this.registerUserRo(request, user.idUser);
    } catch (error) {
      throw error;
    }
  }

  async registerAccount(params: RegisterAccountDto, req: any) {
    const {
      user: { email, idUser },
    } = req;

    const request: IRequestRegisterAccount = {
      ...params,
      email: email.toLowerCase(),
    };
    return this.registerUserRo(request, idUser);
  }

  async registerUserRo(request: IRequestRegisterLogin, idUser: number) {
    try {
      const responseCpanel = await this.cpanelService.registerLogin(request);
      const account = new AccountEntity();
      account.genre = request.sex;
      account.ragnarokId = responseCpanel.idUser;
      account.user = request.userid;
      account.idUser = idUser;
      return await this.accountRepository.insert(account);
    } catch (error) {
      throw error;
    }
  }

  async login(params: LoginDto) {
    const { email, password } = params;
    try {
      const userData = await this.userRepository.findOne({
        select: { email: true, password: true, idUser: true, state: true },
        where: { email },
      });
      if (userData) {
        if (bcrypt.compareSync(password, userData.password)) {
          if (userData.state == USER_STATES.ENABLED) {
            const token = this.tokenService.createToken(userData);
            const response = {
              accessToken: token,
              user: {
                email: userData.email,
              },
            };
            return response;
          } else {
            throw new HttpException(
              'Usuario deshabilitado',
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          throw new HttpException(
            'Contraseña inválida',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        throw new HttpException('Email inválido', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getInfoCpanel() {
    try {
      const response = await this.cpanelService.getInfoCpanel();
      const { connectedUsers } = response;
      const totalUsers = await this.userRepository.count();
      const totalAccounts = await this.accountRepository.count();
      return {
        connectedUsers,
        totalUsers,
        totalAccounts,
      };
    } catch (error) {}
  }

  async getInfoAccount(req: any) {
    const {
      user: { email, idUser },
    } = req;

    return this.cpanelService.getLogin(email)
  }

  async recoveryPassword(req: any) {
    const {
      user: { email, idUser },
    } = req;
    try {
      const userDb = this.userRepository.findOne({ where: { idUser } });
      if (userDb) {
        const newPassword = generatePassword();
        this.userRepository.update(
          { idUser },
          { password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)) },
        );
        // this.emailService.sendEmailWelcomeUser({});
      } else {
        throw new HttpException('Usuario inválido', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }

  // async normalizeEntities(){
  //   try {
  //     await this.accountTmpRepository.clear()
  //     const userAccounts = await this.userAccountRepository.find({ select: {idUserAccount: true, idAccount: true, idUser: true} })
  //     const accountList: AccountTmp[] = []
  //     await Promise.all(userAccounts.map(async (userAccount) =>{
  //       const account = await this.accountRepository.findOneBy({idAccount: userAccount.idAccount})
  //       const accountTmp = new AccountTmp()
  //       accountTmp.createdAt = new Date();
  //       accountTmp.genre = account.genre;
  //       accountTmp.idUser = userAccount.idUser;
  //       accountTmp.ragnarokId = account.ragnarokId;
  //       accountTmp.user = account.user;
  //       accountList.push(accountTmp)
  //     }))
  //       await this.accountTmpRepository.insert(accountList)
  //     return {
  //       message: 'Ok'
  //     }
  //   } catch (error) {
      
  //   }
  // }
}

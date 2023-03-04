import { HttpModule } from '@nestjs/axios';
import { RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { EmailService } from 'src/common/services/email/email.service';
import { Account } from 'src/user/entities/account.entity';
import { AccountTmp } from 'src/user/entities/accounttmp.entity';
import { User } from 'src/user/entities/user.entity';
import { UserAccount } from 'src/user/entities/useraccount.entity';
import { AuthMiddleware } from '../common/middlewares/auth';
import { TokenService } from '../common/services/token/token.service';
import { UserService } from './services/user/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Account]),
    HttpModule,
    TerminusModule,
  ],
  controllers: [UserController],
  providers: [UserService, TokenService, EmailService, CpanelService],
  exports: [
    UserService,
    TokenService,
    TypeOrmModule,
    HttpModule,
    EmailService,
    CpanelService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/api/users/register', method: RequestMethod.POST },
        { path: '/api/users/login', method: RequestMethod.POST },
        { path: '/api/users/get-info', method: RequestMethod.GET },
        { path: '/api/users/ip', method: RequestMethod.GET },
        { path: '/api/users/normalize-entities', method: RequestMethod.PUT },
      )
      .forRoutes('/api/users/');
  }
}

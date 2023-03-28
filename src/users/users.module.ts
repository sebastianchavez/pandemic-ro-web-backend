import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../common/middlewares/auth';
import { CpanelService } from '../common/services/cpanel/cpanel.service';
import { EmailService } from '../common/services/email/email.service';
import { TokenService } from '../common/services/token/token.service';
import { Account } from './entities/Account.entity';
import { User } from './entities/User.entity';
import { UsersController } from './users.controller';
import { UserService } from './services/user/user.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([User, Account]),
      HttpModule,
      TerminusModule,
    ],
    controllers: [UsersController],
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
  export class UsersModule implements NestModule {
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
  
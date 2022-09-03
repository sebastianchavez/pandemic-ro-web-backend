import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../middlewares/auth';
import { TokenService } from '../services/token/token.service';
import { Account } from './entities/account.entity';
import { User } from './entities/user.entity';
import { UserAccount } from './entities/useraccount.entity';
import { UserService } from './services/user/user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Account, UserAccount]),
        HttpModule,
        TerminusModule
    ],
    controllers: [UserController],
    providers: [UserService, TokenService],
    exports: [UserService, TokenService, TypeOrmModule.forFeature([User, Account, UserAccount])]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
            .exclude(
            // { path: '/api/users/register', method: RequestMethod.POST },
            // { path: '/api/users/login', method: RequestMethod.PUT }
        )
            .forRoutes("/api/users/")
    }

}
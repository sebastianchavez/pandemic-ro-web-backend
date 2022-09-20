import { HttpModule } from '@nestjs/axios';
import { RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/user/entities/account.entity';
import { User } from 'src/user/entities/user.entity';
import { UserAccount } from 'src/user/entities/useraccount.entity';
import { AuthMiddleware } from '../middlewares/auth';
import { TokenService } from '../services/token/token.service';
import { UserService } from './services/user/user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Account]),
        TypeOrmModule.forFeature([UserAccount]),
        HttpModule,
        TerminusModule
    ],
    controllers: [UserController],
    providers: [UserService, TokenService],
    exports: [UserService, TokenService, TypeOrmModule, HttpModule]
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware)
            .exclude(
                { path: '/api/users/register', method: RequestMethod.POST },
                { path: '/api/users/login', method: RequestMethod.POST },
                { path: '/api/users/get-info', method: RequestMethod.GET },
            )
            .forRoutes("/api/users/")
    }

}
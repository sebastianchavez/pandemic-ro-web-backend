import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middlewares/auth';
import { TokenService } from 'src/services/token/token.service';
import { Account } from './entities/account.entity';
import { User } from './entities/user.entity';
import { UserAccount } from './entities/UserAccount.entity';
import { UserService } from './services/user/user.service';
import { UserController } from './user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Account, UserAccount]),
        HttpModule,
        TerminusModule
    ],
    controllers: [UserController],
    providers: [UserService, TokenService]
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
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/User.entity';
import { AuthMiddleware } from '../common/middlewares/auth';
import { CpanelService } from '../common/services/cpanel/cpanel.service';
import { TokenService } from '../common/services/token/token.service';
import { ConnectionUserController } from './connection-user.controller';
import { ConnectionUserService } from './services/connection-user/connection-user.service';

@Module({
  controllers: [ConnectionUserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
  ],
  providers: [ConnectionUserService, CpanelService, TokenService],
  exports: [CpanelService, TokenService, TypeOrmModule]
})
export class ConnectionUserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/api/connection-user/');
  }
}

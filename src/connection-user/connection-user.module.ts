import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { AuthMiddleware } from 'src/common/middlewares/auth';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { TokenService } from 'src/common/services/token/token.service';
import { ConnectionUserController } from './connection-user.controller';
import { ConnectionUserService } from './services/connection-user/connection-user.service';

@Module({
  controllers: [ConnectionUserController],
  imports: [
    HttpModule,
  ],
  providers: [ConnectionUserService, CpanelService, TokenService],
  exports: [CpanelService, TokenService]
})
export class ConnectionUserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/api/connection-user/');
  }
}

import { HttpModule } from '@nestjs/axios';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { AdminAuthMiddleware } from '../common/middlewares/admin-auth';
import { CpanelService } from '../common/services/cpanel/cpanel.service';
import { TokenService } from '../common/services/token/token.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { AdminRole } from './entities/adminrole.entity';
import { Menu } from './entities/menu.entity';
import { RoleMenu } from './entities/rolemenu.entity';
import { AdminService } from './services/admin/admin.service';
import { RagnarokCharService } from './services/ragnarok-char/ragnarok-char.service';
import { RagnarokLockService } from './services/ragnarok-lock/ragnarok-lock.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminRole, Menu, RoleMenu, UserEntity]),
    HttpModule,
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    TokenService,
    CpanelService,
    RagnarokCharService,
    RagnarokLockService,
  ],
  exports: [TokenService, CpanelService, TypeOrmModule],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .exclude(
        { path: '/api/admins/register', method: RequestMethod.POST },
        { path: '/api/admins/login', method: RequestMethod.POST },
      )
      .forRoutes('/api/admins/');
  }
}

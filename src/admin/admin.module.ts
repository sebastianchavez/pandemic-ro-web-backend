import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { TokenService } from 'src/common/services/token/token.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { AdminRole } from './entities/adminrole.entity';
import { Menu } from './entities/menu.entity';
import { RoleMenu } from './entities/rolemenu.entity';
import { AdminService } from './services/admin/admin.service';
import { RagnarokCharService } from './services/ragnarok-char/ragnarok-char.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    TypeOrmModule.forFeature([AdminRole]),
    TypeOrmModule.forFeature([Menu]),
    TypeOrmModule.forFeature([RoleMenu]),
    HttpModule
  ],
  controllers: [AdminController],
  providers: [AdminService, TokenService, CpanelService, RagnarokCharService],
  exports: [TokenService, CpanelService]
})
export class AdminModule {}

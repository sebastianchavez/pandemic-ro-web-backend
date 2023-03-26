import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CpanelService } from '../common/services/cpanel/cpanel.service';
import { PrizePvpController } from './prize-pvp.controller';
import { PrizePvpService } from './service/prize-pvp/prize-pvp.service';

@Module({
  controllers: [PrizePvpController],
  imports: [
    HttpModule
  ],
  providers: [PrizePvpService, CpanelService],
  exports: [CpanelService]
})
export class PrizePvpModule {}

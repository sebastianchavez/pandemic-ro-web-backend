import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { PrizeController } from './prize.controller';
import { PrizeService } from './services/prize/prize.service';

@Module({
  controllers: [PrizeController],
  imports: [HttpModule],
  providers: [PrizeService, CpanelService],
  exports: [CpanelService]
})
export class PrizeModule {}

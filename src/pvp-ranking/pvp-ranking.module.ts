import { Module } from '@nestjs/common';
import { PvpRankingController } from './pvp-ranking.controller';
import { PvpRankingService } from './service/pvp-ranking/pvp-ranking.service';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PvpRankingController],
  providers: [PvpRankingService, CpanelService],
  imports:[HttpModule],
  exports: [CpanelService]
})
export class PvpRankingModule {}

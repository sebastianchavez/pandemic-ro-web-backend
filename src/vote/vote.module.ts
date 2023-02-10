import { Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './services/vote/vote.service';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [VoteController],
  imports:[
    HttpModule
  ],
  providers: [VoteService, CpanelService],
  exports: [CpanelService]
})
export class VoteModule {}

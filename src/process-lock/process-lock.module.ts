import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { ProcessLockController } from './process-lock.controller';
import { ProcessLockService } from './services/process-lock/process-lock.service';

@Module({
  imports:[
    HttpModule,
  ],
  controllers: [ProcessLockController],
  providers: [ProcessLockService, CpanelService],
  exports: [CpanelService]
})
export class ProcessLockModule {}

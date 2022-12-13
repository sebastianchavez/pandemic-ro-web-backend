import { Module } from '@nestjs/common';
import { ProcessLockController } from './process-lock.controller';
import { ProcessLockService } from './services/process-lock/process-lock.service';

@Module({
  controllers: [ProcessLockController],
  providers: [ProcessLockService],
})
export class ProcessLockModule {}

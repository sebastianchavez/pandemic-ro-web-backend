import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessLockController } from './process-lock.controller';
import { ProcessLockService } from './services/process-lock/process-lock.service';
import { ProcessLock } from './entities/processlock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessLock])],
  controllers: [ProcessLockController],
  providers: [ProcessLockService],
})
export class ProcessLockModule {}

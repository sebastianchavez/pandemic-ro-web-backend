import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { db } from './common/config/db.config';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { ProcessLockModule } from './process-lock/process-lock.module';
import { ItemModule } from './item/item.module';
import { PrizeModule } from './prize/prize.module';
import { ConnectionUserModule } from './connection-user/connection-user.module';
import { DeviceModule } from './device/device.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    UserModule,
    HealthModule,
    ClientModule,
    AdminModule,
    ProcessLockModule,
    ItemModule,
    PrizeModule,
    ConnectionUserModule,
    DeviceModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

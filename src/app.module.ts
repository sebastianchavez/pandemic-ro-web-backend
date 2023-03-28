import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config/db.config';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { ProcessLockModule } from './process-lock/process-lock.module';
import { ItemModule } from './item/item.module';
import { PrizeModule } from './prize/prize.module';
import { ConnectionUserModule } from './connection-user/connection-user.module';
import { DeviceModule } from './device/device.module';
import { VoteModule } from './vote/vote.module';
import { NewsModule } from './news/news.module';
import { RagnarokServerModule } from './ragnarok-server/ragnarok-server.module';
import { EventsModule } from './events/events.module';
import { PrizePvpModule } from './prize-pvp/prize-pvp.module';
import { User } from './users/entities/User.entity';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    HealthModule,
    ClientModule,
    AdminModule,
    ProcessLockModule,
    ItemModule,
    PrizeModule,
    ConnectionUserModule,
    DeviceModule,
    VoteModule,
    NewsModule,
    RagnarokServerModule,
    EventsModule,
    PrizePvpModule,
    TypeOrmModule.forRoot(db),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

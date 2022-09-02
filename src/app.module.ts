import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config/db.config';
import { User } from './user/entities/user.entity';
import { Account } from './user/entities/account.entity';
import { UserAccount } from './user/entities/useraccount.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    TypeOrmModule.forFeature([User, Account, UserAccount]),
    UserModule,
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

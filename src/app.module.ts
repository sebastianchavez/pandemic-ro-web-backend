import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HealthModule } from './health/health.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { db } from './config/db.config';
import { ConfigService } from '@nestjs/config';
import { TYPEORM_CONFIG } from './config/constants';
import { db } from './config/db.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(db),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) =>
    //     config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    // }),
    // TypeOrmModule.forRoot(db),
    UserModule,
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

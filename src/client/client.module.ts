import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from '../common/services/s3/s3.service';
import { ClientController } from './client.controller';
import { ClientFile } from './entities/client-file.entity';
import { File } from './entities/file.entity';
import { RoClient } from './entities/roclient.entity';
import { Update } from './entities/update.entity';
import { ClientService } from './services/client/client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoClient,Update,ClientFile,File]),
    HttpModule,
    TerminusModule,
  ],
  controllers: [ClientController],
  providers: [ClientService, S3Service],
  exports: [ClientService, TypeOrmModule, S3Service, HttpModule],
})
export class ClientModule {}

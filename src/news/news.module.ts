import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from 'src/common/services/s3/s3.service';
import { Server } from 'src/ragnarok-server/entity/server.entity';
import { News } from './entities/news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './services/news/news.service';

@Module({
  controllers: [NewsController],
  imports:[
    TypeOrmModule.forFeature([News, Server]),
    HttpModule
  ],
  providers: [NewsService, S3Service]
})
export class NewsModule {}

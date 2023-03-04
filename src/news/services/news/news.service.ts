import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IRequestFileS3 } from 'src/common/interfaces/request-s3.interface';
import { S3Service } from 'src/common/services/s3/s3.service';
import { QueryGetNewsDto } from 'src/news/dtos/query-get-news.dto';
import { RequestSaveNewsDto } from 'src/news/dtos/request-save-news.dto';
import { RequestUpdateNewsImageDto } from 'src/news/dtos/request-update-news-image.dto';
import { RequestUpdateNewsDto } from 'src/news/dtos/request-update-news.dto';
import { News } from 'src/news/entities/news.entity';
import { Server } from 'src/ragnarok-server/entity/server.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
    
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
        @InjectRepository(Server)
        private serverRepository: Repository<Server>,
        private s3Service: S3Service
    ){}

    async getNews(query: QueryGetNewsDto){
        try {
            const { inClient, inSlide, inWeb, limit, page, endDate, startDate, title } = query
            const where = {
                inClient, 
                inSlide, 
                inWeb
            }
            if(endDate){
                where['endDate'] = endDate;
            }
            if(startDate){
                where['startDate'] = startDate;
            }
            if(title){
                where['title'] = title;
            }
            let news
            const totalRegister = await this.newsRepository.count({where})
            if(limit > 0){
                news = await this.newsRepository.find({where,take: limit, skip: (limit * page - limit) })
            } else {
                news = await this.newsRepository.findBy(where)
            }
            return {
                news,
                totalRegister
            }
        } catch (error) {
            throw error
        }
    }

    async saveNews(request: RequestSaveNewsDto){
        try {
            const server = await this.serverRepository.findOneBy({})
            const { description, inClient, inSlide, inWeb, title, endDate, image, link, startDate } = request
            const news: News = new News();
            news.createdAt = new Date();
            news.description = description;
            news.inClient = inClient;
            news.inSlide = inSlide;
            news.inWeb = inWeb;
            news.title = title;
            news.endDate = endDate;
            news.image = image;
            news.link = link;
            news.startDate = startDate;
            news.idServer = server.idServer
            return this.newsRepository.insert(news)
        } catch (error) {
            throw error
        }
    }

    async updateNews(request: RequestUpdateNewsDto){
        try {
            const { idNews, description, inClient, inSlide, inWeb, title, endDate, image, link, startDate } = request
            const news = await this.newsRepository.findOneBy({idNews})
            if(news){
                news.description = description;
                news.inClient = inClient;
                news.inSlide = inSlide;
                news.inWeb = inWeb;
                news.title = title;
                news.endDate = endDate;
                news.image = image;
                news.link = link;
                news.startDate = startDate;
                news.updatedAt = new Date();
                return this.newsRepository.save(news)  
            } else {
                throw new HttpException('No existe noticia', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw error
        }
    }

    async deleteNews(idNews: number){
        try {
            return this.newsRepository.delete({idNews})
        } catch (error) {
            throw error
        }
    }

    async updateImage(request: RequestUpdateNewsImageDto){
        try {
            const requestS3: IRequestFileS3 = {
                appId: 'pandemic-ro',
                file: request.image,
                name: request.nameImage,
                path: `news/`,
            }
            const response = await this.s3Service.sendS3File(requestS3)
            return response.data
        } catch (error) {
            throw error
        }
    }
}

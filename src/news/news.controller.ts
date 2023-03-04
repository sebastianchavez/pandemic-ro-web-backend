import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { QueryGetNewsDto } from './dtos/query-get-news.dto';
import { RequestSaveNewsDto } from './dtos/request-save-news.dto';
import { RequestUpdateNewsImageDto } from './dtos/request-update-news-image.dto';
import { RequestUpdateNewsDto } from './dtos/request-update-news.dto';
import { NewsService } from './services/news/news.service';

@Controller('api/news')
export class NewsController {

    constructor(
        private newsService: NewsService
    ){}

    @Get('get-news')
    async getNews(@Query() query: QueryGetNewsDto, @Res() res: Response){
        try {
            const response = await this.newsService.getNews(query)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Post('save-news')
    async saveNews(@Body() body: RequestSaveNewsDto, @Res() res: Response){
        try {
            const response = await this.newsService.saveNews(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Put('update-news')
    async updateNews(@Body() body: RequestUpdateNewsDto, @Res() res: Response){
        try {
            const response = await this.newsService.updateNews(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Delete('delete-news/:id')
    async deleteNews(@Param('id') id: number, @Res() res: Response){
        try {
            const response = await this.newsService.deleteNews(id)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Put('update-image')
    async updateImage(@Body() body: RequestUpdateNewsImageDto, @Res() res: Response){
        try {
            const response = await this.newsService.updateImage(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }
}

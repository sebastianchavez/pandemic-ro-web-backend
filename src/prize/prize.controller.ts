import { Controller, Body, Get, Post, Delete, Res, Query, Param } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Response } from 'express';
import { RequestSavePrizeDto } from './dtos/request-save-prize.dto';
import { PrizeService } from './services/prize/prize.service';

@Controller('api/prizes')
export class PrizeController {

    constructor(
        private prizeService: PrizeService
    ) { }

    @Post('save-prize')
    async savePrize(@Body() body: RequestSavePrizeDto, @Res() res: Response){
        try {
            const response = await this.prizeService.savePrize(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Get('get-prizes')
    async getPrizes(@Res() res: Response){
        try {
            const response = await this.prizeService.getPrizes()
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Delete('delete-prize/:id')
    async deletePrize(@Param() params, @Res() res: Response){
        try {
            const { id } = params
            const response = await this.prizeService.deletePrize(id)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }
}

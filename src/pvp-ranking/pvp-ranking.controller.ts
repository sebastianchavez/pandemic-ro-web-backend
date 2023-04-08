import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { PvpRankingService } from './service/pvp-ranking/pvp-ranking.service';
import { Response } from 'express';

@Controller('api/pvp-ranking')
export class PvpRankingController {

    constructor(
        private pvpRankingService: PvpRankingService
    ){}

    @Get('get-ranking')
    async getRanking(@Res() res: Response){
        try {
            const response = await this.pvpRankingService.getPvpRanking()
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }
}

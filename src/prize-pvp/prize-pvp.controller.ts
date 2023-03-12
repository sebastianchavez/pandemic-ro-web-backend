import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RequestSavePrizePvpDto } from './dtos/request-save-prize-pvp.dto';
import { PrizePvpService } from './service/prize-pvp/prize-pvp.service';

@Controller('api/prizes-pvp')
export class PrizePvpController {
    
    constructor(
        private prizePvpService: PrizePvpService
    ){}

    @Get('get-prizes-pvp')
    async getPrizzesPvp(@Res() res: Response){
        try {
            const response = await this.prizePvpService.getPrizesPvp()
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Post('save-prize-pvp')
    async savePrizePvp(@Body() body: RequestSavePrizePvpDto, @Res() res: Response) {
        try {
            const response = await this.prizePvpService.savePrizePvp(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Delete('delete-prize-pvp/:id')
    async deletePrizePvp(@Param() params, @Res() res: Response){
        try {
            const { id } = params
            const response = await this.prizePvpService.deletePrizePvp(id)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }
}

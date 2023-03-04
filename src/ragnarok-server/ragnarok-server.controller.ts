import { Body, Controller, Get, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { RequestSaveRagnarokServerDto } from './dtos/request-save-ragnarok-server.dto';
import { RequestUpdateRagnarokServerDto } from './dtos/request-update-ragnarok-server.dto';
import { RagnarokServerService } from './services/ragnarok-server/ragnarok-server.service';

@Controller('api/ragnarok-server')
export class RagnarokServerController {
    constructor(
        private serverService: RagnarokServerService
    ){}

    @Get('get-servers')
    async getServer(@Res() res: Response){
        try {
            const response = await this.serverService.getServers()
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Post('save-server')
    async saveServer(@Body() body: RequestSaveRagnarokServerDto, @Res() res: Response){
        try {
            const response = await this.serverService.saveServer(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Put('update-server')
    async updateServer(@Body() body: RequestUpdateRagnarokServerDto, @Res() res: Response){
        try {
            const response = await this.serverService.updateNews(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }
}

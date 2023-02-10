import { Controller, Put, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { VoteDto } from './dtos/vote.dto';
import { VoteService } from './services/vote/vote.service';

@Controller('api/vote')
export class VoteController {

    constructor(
        private voteService: VoteService
    ){}

    @Put()
    async vote(@Body() body: VoteDto, @Res() res: Response){
        try {
            const response = await this.voteService.vote(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }
}

import { Controller, Put, Body, Res, HttpStatus, Post, Delete, Get, Param, Req } from '@nestjs/common';
import { Response } from 'express';
import { VoteDto } from './dtos/vote.dto';
import { VoteService } from './services/vote/vote.service';
import { RequestSaveQuestionDto } from './dtos/request-save-question.dto';
import { RequestUpdateQuestionDto } from './dtos/request-update-question.dto';
import { RequestSaveAlternativeDto } from './dtos/request-save-alternative.dto';
import { RequestUpdateAlternativeDto } from './dtos/request-update-alternative.dto';
import { RequestSaveVoteDto } from './dtos/request-save-vote.dto';
import { RequestSendVoteQuestionDto } from './dtos/request-send-vote-question.dto';

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

    @Post('save-question')
    async saveQuestion(@Body() request: RequestSaveQuestionDto, @Res() res: Response){
        try {
            const response = await this.voteService.saveQuestion(request)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Put('update-question')
    async updateQuestion(@Body() request: RequestUpdateQuestionDto, @Res() res: Response){
        try {
            const response = await this.voteService.updateQuestion(request)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Delete('delete-question/:id')
    async deleteQuestion(@Param('id') id: number, @Res() res: Response){
        try {
            const response = await this.voteService.deleteQuestion(id)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Get('get-questions')
    async getQuestions(@Res() res: Response){
        try {
            const response = await this.voteService.getQuestions()
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
            
        }
    }

    @Get('get-questions-availables')
    async getQuestionsAvailables(@Res() res: Response){
        try {
            const response = await this.voteService.getQuestionsAvailables()
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Post('save-alternative')
    async saveAlternative(@Body() request: RequestSaveAlternativeDto, @Res() res: Response){
        try {
            const response = await this.voteService.saveAlternative(request)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Put('update-alternative')
    async updateAlternative(@Body() request: RequestUpdateAlternativeDto, @Res() res: Response){
        try {
            const response = await this.voteService.updateAlternative(request)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Delete('delete-alternative/:id')
    async deleteAlternative(@Param('id') id: number, @Res() res: Response){
        try {
            const response = await this.voteService.deleteAlternative(id)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Get('get-alternatives')
    async getAlternatives(@Res() res: Response){
        try {
            const response = await this.voteService.getAlternatives()
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Get('get-alternatives-by-question')
    async getAlternativesByQuestion(@Res() res: Response){
        try {
            const response = await this.voteService.getAlternativesByQuestion()
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Post('save-vote')
    async saveVote(@Body() request: RequestSaveVoteDto, @Res() res: Response){
        try {
            const response = await this.voteService.saveVote(request)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Get('get-votes')
    async getVotes(@Res() res: Response){
        try {
            const response = await this.voteService.getVotes()
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Get('get-vote')
    async getVote(@Req() req: any,  @Res() res: Response){
        try {
            const response = await this.voteService.getVote(req)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Post('send-vote-question')
    async sendVoteQuestion(@Req() req: any, @Body() body: RequestSendVoteQuestionDto, @Res() res: Response){
        try {
            const response = await this.voteService.sendVote(req, body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }
}

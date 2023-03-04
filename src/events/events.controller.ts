import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { QueryGetEventsDto } from './dtos/query-get-events.dto';
import { RequestSaveEventDto } from './dtos/request-save-event.dto';
import { RequestUpdateEventDto } from './dtos/request-update-event.dto';
import { EventService } from './services/event/event.service';

@Controller('api/events')
export class EventsController {

    constructor(
        private eventService: EventService
    ){}

    @Get('get-events')
    async getEvents(@Query() query: QueryGetEventsDto, @Res() res: Response){
        try {
            const response = await this.eventService.getEvents(query)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error            
        }
    }

    @Post('save-event')
    async saveEvent(@Body() body: RequestSaveEventDto, @Res() res: Response){
        try {
            const response = await this.eventService.saveEvent(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error            
        }
    }

    @Put('update-event')
    async updateEvent(@Body() body: RequestUpdateEventDto, @Res() res: Response){
        try {
            const response = await this.eventService.updateEvent(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error            
        }
    }

    @Delete('delete-event/:id')
    async deleteEvent(@Param('id') id: number, @Res() res: Response){
        try {
            const response = await this.eventService.deleteEvent(id)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error            
        }
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryGetEventsPageDto } from 'src/events/dtos/query-get-events-page.dto';
import { QueryGetEventsDto } from 'src/events/dtos/query-get-events.dto';
import { RequestSaveEventDto } from 'src/events/dtos/request-save-event.dto';
import { RequestUpdateEventDto } from 'src/events/dtos/request-update-event.dto';
import { Event } from 'src/events/entities/event.entity';
import { Server } from 'src/ragnarok-server/entity/server.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventService {

  schema: string = process.env.DB_SCHEMA;

    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
        @InjectRepository(Server)
        private serverRepository: Repository<Server>,
    ){}
    
    async getEvents(query: QueryGetEventsDto){
        try {
            const { limit, page, title, type } = query
            const where = {}
            if(title){
                where['title'] = title;
            }
            if(type){
                where['type'] = type;
            }
            let events
            const totalRegister = await this.eventRepository.count({where})
            if(limit > 0){
                events = await this.eventRepository.find({where,take: limit, skip: (limit * page - limit) })
            } else {
                events = await this.eventRepository.findBy(where)
            }
            return {
                serverDate: new Date(),
                events,
                totalRegister
            }
        } catch (error) {
            throw error            
        }
    }

    async getEventsPage(queryParams: QueryGetEventsPageDto){
        try {
            const { day, hour } = queryParams
            let query = `SELECT * FROM ${this.schema}.event 
                        WHERE days like '%${day}%'
                        AND startHour > ${hour} ${hour >= 0 ? `AND startHour >= ${hour-400}`: ''}  LIMIT 10`;
            const events = await this.eventRepository.query(query)
            return events
        } catch (error) {
            throw error
        }
    }

    async saveEvent(request: RequestSaveEventDto){
        try {
            const server = await this.serverRepository.findOneBy({})
            const { description, title, type, days, endHour, startHour } = request
            const event: Event = new Event()
            event.title = title
            event.description = description
            event.type = type
            event.days = days
            event.endHour = endHour
            event.startHour = startHour
            event.idServer = server.idServer
            return this.eventRepository.insert(event)
        } catch (error) {
            throw error            
        }
    }

    async updateEvent(request: RequestUpdateEventDto){
        try {
            const { title, description, idEvent, type, days, endHour, startHour } = request
            const event = await this.eventRepository.findOneBy({idEvent})
            if(event){
                event.title = title
                event.description = description
                event.type = type
                event.days = days
                event.endHour = endHour
                event.startHour = startHour
                return this.eventRepository.save(event)
            } else {
                throw new HttpException('No existe evento', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw error            
        }
    }

    deleteEvent(idEvent: number){
        try {
            return this.eventRepository.delete({idEvent})
        } catch (error) {
            throw error            
        }
    }
}

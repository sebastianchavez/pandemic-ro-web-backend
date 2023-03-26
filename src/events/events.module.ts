import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from '../ragnarok-server/entity/server.entity';
import { Event } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventService } from './services/event/event.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Server])
  ],
  controllers: [EventsController],
  providers: [EventService],
  exports:[TypeOrmModule]
})
export class EventsModule {}

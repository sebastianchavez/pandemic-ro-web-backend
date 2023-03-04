import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from './entity/server.entity';
import { RagnarokServerController } from './ragnarok-server.controller';
import { RagnarokServerService } from './services/ragnarok-server/ragnarok-server.service';

@Module({
  controllers: [RagnarokServerController],
  imports:[
    TypeOrmModule.forFeature([Server])
  ],
  providers: [RagnarokServerService]
})
export class RagnarokServerModule {}

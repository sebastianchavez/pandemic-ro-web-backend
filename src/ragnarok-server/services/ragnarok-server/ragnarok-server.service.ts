import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestSaveRagnarokServerDto } from '../../../ragnarok-server/dtos/request-save-ragnarok-server.dto';
import { RequestUpdateRagnarokServerDto } from '../../../ragnarok-server/dtos/request-update-ragnarok-server.dto';
import { Repository } from 'typeorm';
import { Server } from '../../entity/server.entity'

@Injectable()
export class RagnarokServerService {
    constructor(
        @InjectRepository(Server)
        private serverRepository: Repository<Server>,
    ){}

    async getServers(){
        try {
            return this.serverRepository.find()
        } catch (error) {
            throw error
        }
    }

    saveServer(request: RequestSaveRagnarokServerDto){
        try {
            const { description, name } = request
            const server: Server = new Server();
            server.name = name;
            server.description = description;
            return this.serverRepository.insert(server)
        } catch (error) {
            throw error
        }
    }

    async updateNews(request: RequestUpdateRagnarokServerDto){
        try {
            const { idServer, description, name } = request
            const server = await this.serverRepository.findOneBy({idServer})
            if(server){
                server.description = description;
                server.name = name;
                return this.serverRepository.save(server)  
            } else {
                throw new HttpException('No existe noticia', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw error
        }
    }

    // async deleteNews(idServer: number){
    //     try {
    //         return this.serverRepository.delete({idServer})
    //     } catch (error) {
    //         throw error
    //     }
    // }
}

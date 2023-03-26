import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewVersionDto } from '../../../client/dtos/new-version.dto';
import { UpdateClientDto } from '../../../client/dtos/update-client.dto';
import { UpdateFileDto } from '../../../client/dtos/update-file.dto';
import { ClientFile } from '../../../client/entities/client-file.entity';
import { File } from '../../../client/entities/file.entity';
import { RoClient } from '../../../client/entities/roclient.entity';
import { Update } from '../../../client/entities/update.entity';
import { IRequestFileS3 } from '../../../common/interfaces/request-s3.interface';
import { S3Service } from '../../../common/services/s3/s3.service';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(RoClient)
    private roClientRepository: Repository<RoClient>,
    @InjectRepository(File)
    private fileRepository: Repository<File>,
    @InjectRepository(ClientFile)
    private clientFileRepository: Repository<ClientFile>,
    @InjectRepository(Update)
    private updateRepository: Repository<Update>,
    private s3Service: S3Service,
  ) {}

  async updateFile(body: UpdateFileDto) {
    try {
      const requestFile: IRequestFileS3 = {
        appId: 'pandemic-ro',
        file: body.file,
        name: body.name,
        path: `${process.env.NODE_ENV}/client-updates/${body.version}/`,
      };
      const response = await this.s3Service.sendS3File(requestFile);
      const { data } = response;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async saveNewVersion(body: NewVersionDto) {
    try {
      const newClient = new RoClient();
      newClient.version = body.version;
      newClient.description = body.description;
      await this.roClientRepository.insert(newClient);

      for await (const u of body.updates) {
        const newUpdate = new Update();
        newUpdate.idRoClient = newClient.idRoClient;
        newUpdate.description = u.description;
        await this.updateRepository.insert(newUpdate);
      }

      for await (const f of body.files) {
        const newFile = new File();
        if(!f.idFile || f.idFile == null){
          newFile.name = f.name;
          newFile.url = f.url;
          newFile.version = f.version;
          await this.fileRepository.insert(newFile);
        }

        const newClientFile = new ClientFile();
        newClientFile.idRoClient = newClient.idRoClient;
        newClientFile.idFile = f.idFile || newFile.idFile;
        await this.clientFileRepository.insert(newClientFile);
      }

      const files = await this.clientFileRepository.find({
        where: { idRoClient: newClient.idRoClient },
        relations: { idRoClient: true, idFile: true },
      });
      return {
        message: 'Versión agregada con éxito',
        client: newClient,
        files,
      };
    } catch (error) {
      console.log('Error:', error);
      throw new HttpException(
        'Problemas con inserción de datos',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getLastVersion() {
    try {
      const client = await this.roClientRepository.findOne({
        where: { forceUpdate: true },
        order: { createdAt: 'DESC' },
        relations: ['clientFiles', 'clientFiles.idFile', 'updates'],
      });
      return client;
    } catch (error) {
      console.log('Error:', error);
      throw new HttpException('Problemas en consulta', HttpStatus.BAD_REQUEST);
    }
  }

  async getClients() {
    try {
      const clients = await this.roClientRepository.find({
        order: { createdAt: 'DESC' },
        relations: ['clientFiles', 'clientFiles.idFile', 'updates'],
      });
      return { clients };
    } catch (error) {
      console.log('Error:', error);
      throw new HttpException('Problemas en consulta', HttpStatus.BAD_REQUEST);
    }
  }

  async updateClient(params: UpdateClientDto) {
    try {
      const { idRoClient, description, forceUpdate } = params;
      await this.roClientRepository.update(
        { idRoClient },
        { description, forceUpdate },
      );
      const client = await this.roClientRepository.findOne({
        where: { idRoClient },
      });
      return client;
    } catch (error) {
      console.log('Error:', error);
      throw new HttpException('Problemas en consulta', HttpStatus.BAD_REQUEST);
    }
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { NewVersionDto } from './dtos/new-version.dto';
import { UpdateClientDto } from './dtos/update-client.dto';
import { UpdateFileDto } from './dtos/update-file.dto';
import { ClientService } from './services/client/client.service';

@Controller('api/clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post('update-file')
  async updateFile(@Body() body: UpdateFileDto, @Res() res: Response) {
    try {
      const response = await this.clientService.updateFile(body);
      return res
        .status(HttpStatus.OK)
        .send({ message: 'Archivo subido con éxito', url: response.url });
    } catch (error) {
      throw error;
    }
  }

  @Post('new-version')
  async saveNewVersion(@Body() body: NewVersionDto, @Res() res: Response) {
    try {
      const response = await this.clientService.saveNewVersion(body);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }

  @Get('get-last-version')
  async getLastVersion(@Res() res: Response) {
    try {
      const response = await this.clientService.getLastVersion();
      return res.status(HttpStatus.OK).send({
        message: 'Última versión de cliente por actualizar',
        client: response,
      });
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }

  @Get('get-clients')
  async getClients(@Res() res: Response) {
    try {
      const response = await this.clientService.getClients();
      return res.status(HttpStatus.OK).send({
        message: 'Última versión de cliente por actualizar',
        clients: response.clients,
      });
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }

  @Put('update-client')
  async updateClient(@Body() body: UpdateClientDto, @Res() res: Response) {
    try {
      const response = await this.clientService.updateClient(body);
      return res
        .status(HttpStatus.OK)
        .send({ message: 'Cliente actualizado', client: response });
    } catch (error) {
      return res.status(error.status).send(error);
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  Query
} from '@nestjs/common';
import { Response } from 'express';
import { QueryProcessLockDto } from './dtos/query-process-lock.dto';
import { RequestSaveProcessLockDto } from './dtos/request-save-process-lock.dto';
import { RequestUpdateProcessLockDto } from './dtos/request-update-process-lock.dto';
import { ProcessLockService } from './services/process-lock/process-lock.service';

@Controller('api/process-lock')
export class ProcessLockController {
  constructor(private processLockService: ProcessLockService) {}

  @Get('get-process-lock')
  async getProcessLock(@Query() query: QueryProcessLockDto ,@Res() res: Response) {
    try {
      const response = await this.processLockService.getProcessLock(query);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }

  @Post('save-process-lock')
  async saveProcessLock(
    @Body() body: RequestSaveProcessLockDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.processLockService.saveProcessLock(body);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }

  @Put('update-process-lock')
  async updateProcessLock(
    @Body() body: RequestUpdateProcessLockDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.processLockService.updateProcessLock(body);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete-process-lock/:id')
  async deleteProcessLock(@Param() params: any, @Res() res: Response) {
    try {
      const { id } = params;
      const response = await this.processLockService.deleteProcessLock(id);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }
}

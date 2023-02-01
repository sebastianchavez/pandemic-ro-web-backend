import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryProcessLockDto } from './dtos/query-process-lock.dto';
import { SaveProcessLockDto } from './dtos/save-process-lock.dto';
import { UpdateProcessLockDto } from './dtos/update-process-lock.dto';
import { ProcessLockService } from './services/process-lock/process-lock.service';

@Controller('api/process-lock')
export class ProcessLockController {
  constructor(private processLockService: ProcessLockService) {}

  @Get('get-processes-locks')
  async getProcessesLocks(@Query() query: QueryProcessLockDto, @Res() res: Response) {
    try {
      const response = await this.processLockService.getProcessLock(query)
      res.status(HttpStatus.OK).send(response)
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
  }

  @Get('get-process-lock')
  async getOneProcessLock(@Query() query: QueryProcessLockDto, @Res() res: Response) {
    try {
      console.log('response')
      const response = await this.processLockService.getProcessLock(query)
      console.log('response:', response)
      res.status(HttpStatus.OK).send(response.processLocks)
    } catch (error) {
      console.log('error:', error)
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
  }

  @Post('save-process-lock')
  async saveProcessLock(@Body() body: SaveProcessLockDto, @Res() res: Response) {
    try {
      const response = await this.processLockService.saveProcessLock(body)
      res.status(HttpStatus.OK).send(response)
    } catch (error) {
      throw error
    }
  }

  @Put('update-process-lock')
  async updateProcessLock(@Body() body: UpdateProcessLockDto, @Res() res: Response) {
    try {
      const response = await this.processLockService.updateProcessLock(body)
      res.status(200).send(response)
    } catch (error) {
      throw error
    }
  }

  @Delete('delete-process-lock/:id')
  async deleteProcessLock(@Param() params, @Res() res: Response) {
    try {
      const { id } = params
      const response = await this.processLockService.deleteProcessLock(id)
      res.status(200).send(response)
    } catch (error) {
      throw error
    }
  }
}

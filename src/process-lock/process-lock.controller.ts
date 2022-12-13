import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProcessLockService } from './services/process-lock/process-lock.service';

@Controller('api/process-lock')
export class ProcessLockController {
  constructor(private processLockService: ProcessLockService) {}

  @Get('get-processes-locks')
  getProcessesLocks(@Query() query, @Res() res: Response) {
    try {
    } catch (error) {}
  }

  @Get('get-process-lock')
  getOneProcessLock(@Query() query, @Res() res: Response) {
    try {
    } catch (error) {}
  }

  @Post('save-process-lock')
  saveProcessLock(@Body() Body, @Res() res: Response) {
    try {
    } catch (error) {}
  }

  @Put('update-process-lock')
  updateProcessLock(@Body() Body, @Res() res: Response) {
    try {
    } catch (error) {}
  }

  @Delete('delete-process-lock/:id')
  deleteProcessLock(@Param() params, @Res() res: Response) {
    try {
    } catch (error) {}
  }
}

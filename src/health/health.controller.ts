import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health')
export class HealthController {
  constructor() {}

  @Get('status')
  async checkStatusServer(@Res() res: Response) {
    try {
      res.send({});
    } catch (error) {
      res.send({ error });
    }
  }

  checkDb() {}
}

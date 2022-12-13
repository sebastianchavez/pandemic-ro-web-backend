import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Query,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { QueryGetCharsDto } from './dtos/query-get-chars.dto';
import { QueryGetLoginsDto } from './dtos/query-get-logins.dto';
import { RegisterAdminDto } from './dtos/register-admin.dto';
import { RequestLockUserDto } from './dtos/request-lock-user.dto';
import { AdminService } from './services/admin/admin.service';
import { RagnarokCharService } from './services/ragnarok-char/ragnarok-char.service';
import { RagnarokLockService } from './services/ragnarok-lock/ragnarok-lock.service';

@Controller('api/admins')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private ragnarokCharService: RagnarokCharService,
    private ragnarokLockService: RagnarokLockService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterAdminDto, @Res() res: Response) {
    try {
      await this.adminService.register(body);
      return res.status(HttpStatus.OK).send({ message: 'Admin registrado' });
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  async login(@Body() body: LoginAdminDto, @Res() res: Response) {
    try {
      const admin = await this.adminService.login(body);
      return res
        .status(HttpStatus.OK)
        .send({ message: 'Admin registrado', admin });
    } catch (error) {
      throw error;
    }
  }

  @Get('get-chars')
  async getLogins(@Query() query: QueryGetCharsDto, @Res() res: Response) {
    try {
      const response = await this.ragnarokCharService.getChars(query);
      return res
        .status(HttpStatus.OK)
        .send({ message: 'chars', data: response });
    } catch (error) {
      throw error;
    }
  }

  @Put('lock-user')
  async lockUser(@Body() body: RequestLockUserDto, @Res() res: Response) {
    try {
      const response = await this.ragnarokLockService.lockUser(body);
      return res.status(HttpStatus.OK).send(response);
    } catch (error) {
      throw error;
    }
  }
}

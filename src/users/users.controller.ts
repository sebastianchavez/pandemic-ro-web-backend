import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from './dtos/login.dto';
import { RegisterAccountDto } from './dtos/register-account.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserService } from './services/user/user.service';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    try {
      const response = await this.userService.login(body);
      res.status(200).send({
        message: 'Usuario autenticado',
        accessToken: response.accessToken,
        currentUser: response.user,
      });
    } catch (error) {
      res.status(error.status).send({ error, message: error.message });
    }
  }

  @Post('register')
  async register(@Body() body: RegisterDto, @Res() res: Response) {
    try {
      await this.userService.register(body);
      res
        .status(HttpStatus.OK)
        .send({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      if (error['code'] && error['code'] == 'ER_DUP_ENTRY') {
        res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: 'Ya existe un jugador con este email' });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.response
      ) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .send({ message: error.response.data.response });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error, message: error.message });
      }
    }
  }

  @Post('register-account')
  async registerAccount(
    @Body() body: RegisterAccountDto,
    @Req() req: any,
    @Res() res: Response,
  ) {
    try {
      const response = await this.userService.registerAccount(body, req);
      res
        .status(HttpStatus.OK)
        .send({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error, message: error?.response?.data?.response });
    }
  }

  @Get('get-info')
  async gerInfoCPanel(@Res() res: Response) {
    try {
      const response = await this.userService.getInfoCpanel();
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      res.status(error.status).send({ error, message: error.message });
    }
  }

  @Get('get-accounts')
  async getAccounts(@Req() req: any, @Res() res: Response) {
    try {
      const response = await this.userService.getInfoAccount(req);
      res.status(HttpStatus.OK).send(response);
    } catch (error) {
      res.status(error.status).send({ error, message: error.message });
    }
  }

  @Put('recovery-password')
  async recoveryPassword(@Req() req: any, @Res() res: Response) {
    try {
    } catch (error) {
      res.status(error.status).send({ error, message: error.message });
    }
  }

  @Get('ip')
  getIpAddressFromRequest(@Req() request: any): string {
    return request.ipInfo;
  }

  // se usó para normalizar tablas
  // @Put('normalize-entities')
  // async normalizeEntities(@Res() res: Response){
  //   try {
  //     const response = await this.userService.normalizeEntities()
  //     res.status(HttpStatus.OK).send(response);
  //   } catch (error) {
  //     res.status(error.status).send({ error, message: error.message });
  //   }
  // }
}
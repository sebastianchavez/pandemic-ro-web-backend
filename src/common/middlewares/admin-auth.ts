import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AdminService } from '../../admin/services/admin/admin.service';
import { TokenService } from '../services/token/token.service';
require('dotenv').config();

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  constructor(
    private tokenService: TokenService,
    private adminService: AdminService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'No tienes autorizacion' });
    }

    const authorization = req.headers.authorization.split(' ');
    if (authorization[0] != 'Bearer') {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'No tienes autorizacion' });
    } else {
      try {
        const response: any = await this.tokenService.decodeToken(
          authorization[1],
        );
        if (response) {
          const idAdmin = response.idAdmin;
          const admin = await this.adminService.getAdminById(idAdmin);
          if (admin) {
            req['admin'] = response;
            next();
          } else {
            res
              .status(HttpStatus.UNAUTHORIZED)
              .send({ message: 'No tienes autorizacion' });
          }
        } else {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .send({ message: 'Falló autenticacion de token' });
        }
      } catch (error) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ message: 'Falló autenticacion de token' });
      }
    }
  }
}

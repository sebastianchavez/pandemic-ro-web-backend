import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from "express";
import * as bcrypt from 'bcrypt-nodejs'
import { TokenService } from 'src/services/token/token.service';
require('dotenv').config()

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private tokenService: TokenService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'No tienes autorizacion' })
        }

        const authorization = req.headers.authorization.split(' ')
        if (authorization[0] != 'Bearer') {
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'No tienes autorizacion' })
        } else {
            try {
                const response = await this.tokenService.decodeToken(authorization[1])
                req['user'] = response
                next()
            } catch (error) {
                res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Falló autenticacion de token' })
            }
        }
    }
}
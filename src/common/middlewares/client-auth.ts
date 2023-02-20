
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from "express";
import * as bcrypt from 'bcrypt-nodejs'
require('dotenv').config()

@Injectable()
export class ClientAuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {

        if (!req.headers.authorization) {
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'No tienes autorizacion' })
        }

        const authorization = req.headers.authorization.split(' ')
        if (authorization[0] != 'Bearer') {
            return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'No tienes autorizacion' })
        } else {
            const { SECRET_KEY } = process.env
            if (bcrypt.compareSync(authorization[1], SECRET_KEY)) {
                next()
            } else {
                return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'No tienes autorizacion' })
            }
        }
    }
}
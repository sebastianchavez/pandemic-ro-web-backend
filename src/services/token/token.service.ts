import { Injectable } from '@nestjs/common';
import * as moment from 'moment'
import { config } from 'dotenv'
import * as jwt from 'jwt-simple'
import { User } from './../../user/entities/User.entity';
config()

const { SECRET_TOKEN } = process.env

@Injectable()
export class TokenService {

    createToken(user: User) {
        const payload = {
            sub: {
                idUser: user.idUser,
                email: user.email,
            },
            iat: moment().unix(),
            exp: moment().add(5, 'day').unix()
        }

        return jwt.encode(payload, SECRET_TOKEN)
    }

    decodeToken(token) {
        const decode = new Promise((resolve, reject) => {
            try {
                const payload = jwt.decode(token, SECRET_TOKEN)
                if (payload.exp <= moment().unix()) {
                    reject({
                        status: 401,
                        message: 'El Token ha expirado'
                    })
                }
                resolve(payload.sub)
            } catch (e) {
                reject({
                    status: 500,
                    message: e.message
                })
            }
        })
        return decode
    }
}

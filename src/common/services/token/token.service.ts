import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { config } from 'dotenv';
import * as jwt from 'jwt-simple';
import { UserEntity } from '../../../user/entities/user.entity';
import { Admin } from '../../../admin/entities/admin.entity';
config();

const { SECRET_TOKEN } = process.env;

@Injectable()
export class TokenService {
  createTokenAdmin(admin: Admin) {
    const payload = {
      sub: {
        idAdmin: admin.idAdmin,
        email: admin.email,
        idAdminRole: admin.idAdminRole,
      },
      iat: moment().unix(),
      exp: moment().add(30, 'days').unix(),
    };
    return jwt.encode(payload, SECRET_TOKEN);
  }

  createToken(user: UserEntity) {
    const payload = {
      sub: {
        idUser: user.idUser,
        email: user.email,
      },
      iat: moment().unix(),
      exp: moment().add(30, 'days').unix(),
    };

    return jwt.encode(payload, SECRET_TOKEN);
  }

  decodeToken(token) {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(token, SECRET_TOKEN);
        if (payload.exp <= moment().unix()) {
          reject({
            status: 401,
            message: 'El Token ha expirado',
          });
        }
        resolve(payload.sub);
      } catch (e) {
        reject({
          status: 500,
          message: e.message,
        });
      }
    });
  }
}

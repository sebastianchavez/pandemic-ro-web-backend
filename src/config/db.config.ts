import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { UserAccount } from "../user/entities/useraccount.entity"
import { User } from "../user/entities/user.entity"
import { Account } from "../user/entities/account.entity"
require('dotenv').config()
const { DB_PORT, DB_USER, DB_PASS, DB_SCHEMA, DB_HOST } = process.env

console.log('path:', __dirname)

export const db: TypeOrmModuleOptions = {
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_SCHEMA,
    entities: ['src/**/**/*.entity.js'],
    synchronize: true,
    autoLoadEntities: true,
    extra: {
        seeds: ['src/db/seeds/**/*.seed.js'],
        factories: ['src/db/factories/**/*.factory.js'],
    }
}
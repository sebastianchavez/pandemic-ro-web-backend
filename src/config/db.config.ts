import { TypeOrmModuleOptions } from "@nestjs/typeorm"
require('dotenv').config()
const { DB_PORT, DB_USER, DB_PASS, DB_SCHEMA, DB_HOST } = process.env

export const db: TypeOrmModuleOptions = {
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_SCHEMA,
    entities: ["/home/ubuntu/pandemic-ro-web-backend/src/**/**/*.entity{.ts,.js}"],

    // factories: ["dist/**/database/factories/**/*.js"],
    // seeds: ["dist/**/database/seeds/**/*.js"],
    synchronize: true,
    autoLoadEntities: true,

}
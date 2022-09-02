import { TypeOrmModuleOptions } from "@nestjs/typeorm"
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
    entities: [__dirname + "../../user/entities/*.entity.ts"],
    synchronize: true,
    autoLoadEntities: true,
}
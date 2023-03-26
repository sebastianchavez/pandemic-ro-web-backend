import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config();
const { DB_PORT, DB_USER, DB_PASS, DB_SCHEMA, DB_HOST } = process.env;

console.log('path:', __dirname);

export const db: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_SCHEMA,
  entities: [
   '../**/**/*.entity.{ts,js}'
  ],
  autoLoadEntities: true,
  synchronize: true,
};

// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//     {
//         provide: 'DATA_SOURCE',
//         useFactory: async () => {
//             const dataSource = new DataSource({
//                 type: 'mysql',
//                 host: DB_HOST,
//                 port: Number(DB_PORT),
//                 username: DB_USER,
//                 password: DB_PASS,
//                 database: DB_SCHEMA,
//                 entities: [
//                     __dirname + '/../**/*.entity{.ts,.js}',
//                 ],
//                 synchronize: true,
//             });

//             return dataSource.initialize();
//         },
//     },
// ];

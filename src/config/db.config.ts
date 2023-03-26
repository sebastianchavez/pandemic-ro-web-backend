import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { AdminRole } from '../admin/entities/adminrole.entity';
import { Menu } from '../admin/entities/menu.entity';
import { RoleMenu } from '../admin/entities/rolemenu.entity';
import { ClientFile } from '../client/entities/client-file.entity';
import { File } from '../client/entities/file.entity';
import { RoClient } from '../client/entities/roclient.entity';
import { Update } from '../client/entities/update.entity';
import { Device } from '../device/entities/device.entity';
import { Event } from '../events/entities/event.entity';
import { News } from '../news/entities/news.entity';
import { ProcessLock } from '../process-lock/entities/processlock.entity';
import { Server } from '../ragnarok-server/entity/server.entity';
import { Account } from '@entities/account';
import { User } from '@entities/user';
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
    User,
    Account,
    Server, 
    ProcessLock,
    News,
    Event,
    Device,
    RoClient,
    Update, 
    ClientFile,
    File,
    Admin,
    AdminRole,
    Menu,
    RoleMenu
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

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { File } from './file.entity';
import { RoClient } from './roclient.entity';

@Entity('client_file')
export class ClientFile {
  @PrimaryGeneratedColumn('increment')
  idClientFile: number;

  @ManyToOne((type) => RoClient, (r) => r.idRoClient)
  @JoinColumn({ name: 'idRoClient' })
  idRoClient: number;

  @ManyToOne((type) => File, (f) => f.idFile)
  @JoinColumn({ name: 'idFile' })
  @JoinTable({ name: 'file' })
  idFile: number | File;
}

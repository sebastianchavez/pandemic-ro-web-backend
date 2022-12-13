import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RoClient } from './roclient.entity';

@Entity('file')
export class File {
  @PrimaryGeneratedColumn('increment')
  idFile: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  size: number;
}

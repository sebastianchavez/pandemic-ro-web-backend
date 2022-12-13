import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { RoClient } from './roclient.entity';

@Entity('update')
export class Update {
  @PrimaryGeneratedColumn('increment')
  idUpdate: number;

  @Column()
  description: string;

  @ManyToOne((type) => RoClient, (r) => r.idRoClient)
  @JoinColumn({ name: 'idRoClient' })
  idRoClient: number;
}

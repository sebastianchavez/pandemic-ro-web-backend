import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('increment')
  idAccount: number;

  @Column()
  ragnarokId: number;

  @Column({ unique: true })
  user: string;

  @Column()
  genre: string;

  @ManyToOne((type) => User, (u) => u.idUser)
  @JoinColumn({ name: 'idUser' })
  idUser: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}

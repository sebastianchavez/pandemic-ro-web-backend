import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('accounttmp')
export class AccountTmp {
  @PrimaryGeneratedColumn('increment')
  idAccount: number;

  @Column({ unique: true })
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

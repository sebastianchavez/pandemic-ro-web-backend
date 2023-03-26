import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '@entities/User';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('increment')
  idAccount: number;

  @Column()
  ragnarokId: number;

  @Column({ unique: true })
  user: string;

  @Column()
  genre: string;

  @ManyToOne((type) => UserEntity, (u) => u.idUser)
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

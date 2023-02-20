import { Account } from 'src/user/entities/account.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('user_account')
export class UserAccount {
  @PrimaryGeneratedColumn('increment')
  idUserAccount: number;

 @Column()
  idUser?: number;

 @Column()
 idAccount?: number;
}

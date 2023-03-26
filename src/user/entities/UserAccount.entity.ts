import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
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

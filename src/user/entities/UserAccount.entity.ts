import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { Account } from '@entities/account';
import { User } from '@entities/user';

@Entity('user_account')
export class UserAccount {
    @PrimaryGeneratedColumn('increment')
    idUserAccount: number;

    @ManyToOne(type => User, u => u.idUser)
    @JoinColumn({ name: 'idUser' })
    idUser: number;


    @ManyToOne(type => Account, a => a.idAccount)
    @JoinColumn({ name: 'idAccount' })
    idAccount: number;

}
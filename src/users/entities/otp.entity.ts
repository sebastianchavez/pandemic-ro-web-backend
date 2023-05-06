import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('otp')
export class Otp {
    @PrimaryGeneratedColumn('increment')
    idOtp: number;

    @Column()
    otp: string;

    @Column()
    idUser: number;
}
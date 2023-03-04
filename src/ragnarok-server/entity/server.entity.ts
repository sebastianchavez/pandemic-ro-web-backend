import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('server')
export class Server {
    @PrimaryGeneratedColumn('increment')
    idServer: number;

    @Column()
    name: string;

    @Column()
    description: string;
}
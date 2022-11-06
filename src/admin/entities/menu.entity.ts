import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('menu')
export class Menu {
    @PrimaryGeneratedColumn('increment')
    idMenu: number;

    @Column()
    name: string;

    @Column()
    route: string;
}
import { Server } from "src/ragnarok-server/entity/server.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('event')
export class Event {
    @PrimaryGeneratedColumn('increment')
    idEvent: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    days: number; // 1234567

    @Column()
    startHour: number;

    @Column()
    endHour: number;

    @ManyToOne((type) => Server, (s) => s.idServer)
    @JoinColumn({ name: 'idServer' })
    idServer: number;
}
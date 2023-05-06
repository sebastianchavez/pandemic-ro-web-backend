import { Server } from "src/ragnarok-server/entity/server.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('question')
export class Question {
    @PrimaryGeneratedColumn('increment')
    idQuestion: number;

    @Column()
    question: string;

    @Column()
    startDate: Date;
    
    @Column()
    endDate: Date;

    @ManyToOne((type) => Server, (u) => u.idServer)
    @JoinColumn({ name: 'idServer' })
    idServer: number;
}
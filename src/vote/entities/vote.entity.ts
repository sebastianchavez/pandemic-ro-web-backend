import { User } from "src/users/entities/User.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity('vote')
export class Vote {
    @PrimaryGeneratedColumn('increment')
    idVote: number;

    @Column()
    response: string;

    @Column()
    ip: string;

    @ManyToOne((type) => User, (u) => u.idUser)
    @JoinColumn({ name: 'idUser' })
    idUser: number;

    @ManyToOne((type) => Question, (u) => u.idQuestion)
    @JoinColumn({ name: 'idQuestion' })
    idQuestion: number | any;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;
}
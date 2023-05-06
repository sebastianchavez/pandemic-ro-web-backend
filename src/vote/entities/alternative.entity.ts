import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity('alternative')
export class Alternative {
    @PrimaryGeneratedColumn('increment')
    idAlternative: number;

    @Column()
    alternative: string;

    @Column()
    value: string;

    @ManyToOne((type) => Question, (u) => u.idQuestion)
    @JoinColumn({ name: 'idQuestion' })
    idQuestion: number;
}
import { Server } from "../../ragnarok-server/entity/server.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('news')
export class News {
    @PrimaryGeneratedColumn('increment')
    idNews: number;

    @Column()
    image: string;

    @Column()
    inWeb: boolean;

    @Column()
    inClient: boolean;

    @Column()
    inSlide: boolean;

    @Column()
    link: string;

    @Column({nullable: true})
    startDate?: Date;

    @Column({nullable: true})
    endDate?: Date;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @ManyToOne((type) => Server, (s) => s.idServer)
    @JoinColumn({ name: 'idServer' })
    idServer: number;
}
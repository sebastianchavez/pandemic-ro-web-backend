import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('increment')
    idAccount: number;

    @Column({ unique: true })
    ragnarokId: number;

    @Column({ unique: true })
    user: string;

    @Column()
    genre: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, JoinTable } from 'typeorm';
import { ClientFile } from './client-file.entity';
import { Update } from './update.entity';

@Entity('ro_client')
export class RoClient {
    @PrimaryGeneratedColumn('increment')
    idRoClient: number;

    @Column()
    version: string;

    @Column()
    description: string;

    @Column({ default: false })
    forceUpdate: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date;

    @JoinColumn({ name: 'idRoClient' })
    @JoinTable({ name: 'client_file' })
    @OneToMany(type => ClientFile, c => c.idRoClient)
    clientFiles: ClientFile[]

    @JoinColumn({ name: 'idRoClient' })
    @JoinTable({ name: 'update' })
    @OneToMany(type => Update, c => c.idRoClient)
    updates: Update[]
}
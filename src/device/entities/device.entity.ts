import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('device')
export class Device {

    @PrimaryGeneratedColumn('increment')
    device_id: number;

    @Column()
    mac: string;

    @Column()
    ip: string;

    @Column()
    os: string;

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

    @Column()
    enabled: boolean;

    @Column()
    typeUser: string; // user - admin

    @Column()
    socketId: string;

    @Column()
    is_connected: boolean;
}
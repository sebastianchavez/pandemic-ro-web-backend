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
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;

    @Column()
    enabled: boolean;

    @Column()
    type_user: string; // user - admin

    @Column()
    socket_id: string;

    @Column()
    is_connected: boolean;
}
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AdminRole } from './adminrole.entity';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn('increment')
  idAdmin: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  isAvailable: boolean;

  @ManyToOne((type) => AdminRole, (a) => a.idAdminRole)
  @JoinColumn({ name: 'idAdminRole' })
  idAdminRole: number;
}

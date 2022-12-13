import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_role')
export class AdminRole {
  @PrimaryGeneratedColumn('increment')
  idAdminRole: number;

  @Column()
  role: string;
}

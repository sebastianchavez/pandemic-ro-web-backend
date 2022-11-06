import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdminRole } from "./adminrole.entity";
import { Menu } from "./menu.entity";

@Entity('role_menu')
export class RoleMenu {
    @PrimaryGeneratedColumn('increment')
    idRoleMenu: number;

    @ManyToOne(type => Menu, a => a.idMenu)
    @JoinColumn({ name: 'idMenu' })
    idMenu: string;

    @ManyToOne(type => AdminRole, a => a.idAdminRole)
    @JoinColumn({ name: 'idAdminRole' })
    idAdminRole: string;
}
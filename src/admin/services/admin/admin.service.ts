import { Injectable , HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAdminDto } from 'src/admin/dtos/login-admin.dto';
import { RegisterAdminDto } from 'src/admin/dtos/register-admin.dto';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminRole } from 'src/admin/entities/adminrole.entity';
import { Menu } from 'src/admin/entities/menu.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt-nodejs'
import { RoleMenu } from 'src/admin/entities/rolemenu.entity';
import { TokenService } from 'src/common/services/token/token.service';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { IQueryGetLogins } from 'src/common/interfaces/query-get-logins.interface';
import { QueryGetLoginsDto } from 'src/admin/dtos/query-get-logins.dto';

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        @InjectRepository(AdminRole)
        private adminRoleRepository: Repository<AdminRole>,
        @InjectRepository(Menu)
        private menuRepository: Repository<Menu>,
        @InjectRepository(RoleMenu)
        private roleMenuRepository: Repository<RoleMenu>,
        private tokenService: TokenService,
    ){}

    async register(body: RegisterAdminDto){
        try {
            const adminRole = await this.adminRoleRepository.findOne({ where: { idAdminRole: body.idAdminRole }})
            if(adminRole){
                const admin = await this.adminRepository.findOne({where: { email: body.email }})
                if(!admin){
                    const newAdmin = new Admin();
                    newAdmin.email = body.email;
                    newAdmin.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
                    newAdmin.isAvailable = true;
                    newAdmin.idAdminRole = body.idAdminRole;
                    return await this.adminRepository.insert(newAdmin)
                } else {
                    throw new HttpException('Ya existe usuario', HttpStatus.BAD_REQUEST)
                }
            } else {
                throw new HttpException('No existe rol', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw error
        }
    }

    async login(body: LoginAdminDto){
        try {
            const admin = await this.adminRepository.findOne({where: { email: body.email }})
            if(admin){
                if(bcrypt.compareSync(body.password, admin.password)){
                    const token = this.tokenService.createTokenAdmin(admin)
                    const response = {
                        accessToken: token,
                        admin: {
                            email: admin.email,
                        }
                    }
                    return response
                }else {
                    throw new HttpException('Contraseña incorrecta', HttpStatus.BAD_REQUEST)
                }
            } else {
                throw new HttpException('Ya existe usuario', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw error
        }
    }

    async getAdminById(idAdmin: number){
        try {
            return this.adminRepository.findOne({where: {idAdmin, isAvailable: true}})
        } catch (error) {
            throw error
        }
    }
}

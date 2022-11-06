import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { RegisterAdminDto } from './dtos/register-admin.dto';
import { AdminService } from './services/admin/admin.service';

@Controller('api/admins')
export class AdminController {

    constructor(
        private adminService: AdminService
    ){}

    @Post('register')
    async register(@Body() body: RegisterAdminDto, @Res() res: Response){
        try {
            await this.adminService.register(body)
            return res.status(HttpStatus.OK).send({ message: 'Admin registrado' })
        } catch (error) {
            throw error
        }
    }
    
    @Post('login')
    async login(@Body() body: LoginAdminDto, @Res() res: Response){
        try {
            const admin = await this.adminService.login(body)
            return res.status(HttpStatus.OK).send({ message: 'Admin registrado', admin })
        } catch (error) {
            throw error
        }
    }
}

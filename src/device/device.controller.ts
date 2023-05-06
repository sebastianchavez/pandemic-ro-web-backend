import { Controller, Put, Body, Res, Get, Query } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Response } from 'express';
import { RequestDisconnectDeviceDto } from './dtos/request-disconnect-device.dto';
import { RequestUpdateDeviceDto } from './dtos/request-update-device.dto';
import { DeviceService } from './services/device/device.service';

@Controller('api/device')
export class DeviceController {

    constructor(
        private deviceService: DeviceService
    ){}

    @Put('update-device')
    async updateDevice(@Body() body: RequestUpdateDeviceDto, @Res() res: Response){
        try {
            const response = await this.deviceService.insertOrUpdateDevice(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Put('disconnect-device')
    async disconnectDevice(@Body() body: RequestDisconnectDeviceDto, @Res() res: Response){
        try {
            const response = await this.deviceService.disconnectDevice(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }

    @Get('get-devices')
    async getDevices(@Query() query, @Res() res: Response){
        try {
            const response = await this.deviceService.getDevices(query)
            res.status(HttpStatus.OK).send(response)            
        } catch (error) {
            throw error
        }
    }
}

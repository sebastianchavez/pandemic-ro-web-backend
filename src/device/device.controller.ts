import { Controller, Body, Res, Put, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
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
            const response = await this.deviceService.updateDevice(body)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            throw error
        }
    }
}

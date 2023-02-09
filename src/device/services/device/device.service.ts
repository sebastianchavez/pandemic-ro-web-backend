import { Injectable } from '@nestjs/common';
import { IRequestUpdateDevice } from 'src/common/interfaces/request-update-device.interface';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { RequestUpdateDeviceDto } from 'src/device/dtos/request-update-device.dto';

@Injectable()
export class DeviceService {

    constructor(
        private cpanelService: CpanelService
    ){}

    async updateDevice(request: RequestUpdateDeviceDto){
        const { ip, mac, os, } = request 
        const device: IRequestUpdateDevice = {
            ip,
            mac,
            os
        }
        return this.cpanelService.updateDevice(device)
    }
}

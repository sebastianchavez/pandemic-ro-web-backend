import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeUser } from '../../../common/enums/type-user.enum';
import { RequestDisconnectDeviceDto } from '../../../device/dtos/request-disconnect-device.dto';
import { RequestUpdateDeviceDto } from '../../../device/dtos/request-update-device.dto';
import { Device } from '../../../device/entities/device.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceService {

    constructor(
        @InjectRepository(Device)
        private deviceRepository: Repository<Device>,
    ){}

    async insertOrUpdateDevice(request: RequestUpdateDeviceDto){
        const { mac, ip, os, socketId } = request
        try {
            const device = await this.deviceRepository.findOneBy({
                mac
            })
            if(device){
                device.updatedAt = new Date();
                device.ip = ip;
                device.os = os;
                device.socketId = socketId;
                device.is_connected = true;
                await this.deviceRepository.save(device)
            } else {
                const newDevice = new Device();
                newDevice.enabled = true;
                newDevice.ip = ip;
                newDevice.os = os;
                newDevice.mac = mac;
                newDevice.typeUser = TypeUser.user
                newDevice.createdAt = new Date();
                newDevice.is_connected = true;
                newDevice.socketId = socketId;
                await this.deviceRepository.insert(newDevice)
            }

            return {
                message: 'Ok'
            }
        } catch (error) {
            throw error    
        }
    }

    async disconnectDevice(request: RequestDisconnectDeviceDto){
        try {
            const { socketId } = request
            const device = await this.deviceRepository.findOneBy({
                socketId
            })
            if(!device){
                throw new HttpException('Dispositivo no encontrado', HttpStatus.BAD_REQUEST)
            }

            device.updatedAt = new Date();
            device.is_connected = false;
            await this.deviceRepository.save(device)


            return {
                message: 'Ok'
            }
        } catch (error) {
            throw error    
        }
    }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceController } from './device.controller';
import { Device } from './entities/device.entity';
import { DeviceService } from './services/device/device.service';

@Module({
  controllers: [DeviceController],
  imports: [
    TypeOrmModule.forFeature([Device]),
  ],
  providers: [DeviceService]
})
export class DeviceModule {}

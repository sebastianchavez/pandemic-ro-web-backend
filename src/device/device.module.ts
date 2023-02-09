import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { DeviceController } from './device.controller';
import { DeviceService } from './services/device/device.service';

@Module({
  controllers: [DeviceController],
  imports: [
    HttpModule,
  ],
  providers: [DeviceService, CpanelService],
  exports: [CpanelService]
})
export class DeviceModule {}

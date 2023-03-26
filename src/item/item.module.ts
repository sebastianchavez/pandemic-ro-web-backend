import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CpanelService } from '../common/services/cpanel/cpanel.service';
import { ItemController } from './item.controller';
import { ItemService } from './services/item/item.service';

@Module({
  controllers: [ItemController],
  imports:[HttpModule],
  providers: [ItemService, CpanelService],
  exports: [CpanelService]
})
export class ItemModule {}

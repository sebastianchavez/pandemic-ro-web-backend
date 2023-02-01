import { Controller, Get, Query, Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Response } from 'express';
import { QueryGetItemDto } from './dtos/query-get-item.dto';
import { ItemService } from './services/item/item.service';

@Controller('api/items')
export class ItemController {
    
    constructor(
        private itemService: ItemService
    ) {}

    @Get('get-items')
    async getItems(@Query() query: QueryGetItemDto, @Res() res: Response){
        try {
            const response = await this.itemService.getItems(query)
            res.status(HttpStatus.OK).send(response)
        } catch (error) {
            console.log('error:', error);
            throw error
        }
    }
}

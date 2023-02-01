import { Injectable } from '@nestjs/common';
import { IQueryGetItems } from 'src/common/interfaces/query-get-items.interface';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { QueryGetItemDto } from 'src/item/dtos/query-get-item.dto';

@Injectable()
export class ItemService {

    constructor(
        private cpanelService: CpanelService
    ){}

    async getItems(queryGetItem: QueryGetItemDto){
        const { limit, name, page } = queryGetItem
        const query: IQueryGetItems = {
            limit,
            page,
            name
        }
        return this.cpanelService.getItems(query)
    }
}

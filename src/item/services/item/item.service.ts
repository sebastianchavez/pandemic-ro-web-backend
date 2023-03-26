import { Injectable } from '@nestjs/common';
import { IQueryGetItems } from '../../../common/interfaces/query-get-items.interface';
import { CpanelService } from '../../../common/services/cpanel/cpanel.service';
import { QueryGetItemDto } from '../../../item/dtos/query-get-item.dto';

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

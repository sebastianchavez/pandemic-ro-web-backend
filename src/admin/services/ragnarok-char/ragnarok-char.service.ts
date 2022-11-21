import { Injectable } from '@nestjs/common';
import { QueryGetCharsDto } from 'src/admin/dtos/query-get-chars.dto';
import { IQueryGetChars } from 'src/common/interfaces/query-get-chars.interface';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';

@Injectable()
export class RagnarokCharService {

    constructor(
        private cpanelService: CpanelService

    ){}

    async getChars(params: QueryGetCharsDto){
        try {
            const query: IQueryGetChars = {
                ...params
            }
            const response = await this.cpanelService.getChars(query)
            return response
        } catch (error) {
            throw error
        }
    }
}

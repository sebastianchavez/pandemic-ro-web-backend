import { Injectable } from '@nestjs/common';
import { QueryGetCharsDto } from '../../../admin/dtos/query-get-chars.dto';
import { IQueryGetChars } from '../../../common/interfaces/query-get-chars.interface';
import { CpanelService } from '../../../common/services/cpanel/cpanel.service';

@Injectable()
export class RagnarokCharService {
  constructor(private cpanelService: CpanelService) {}

  async getChars(params: QueryGetCharsDto) {
    try {
      const query: IQueryGetChars = {
        ...params,
      };
      const response = await this.cpanelService.getChars(query);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

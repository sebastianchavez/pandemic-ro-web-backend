import { Injectable } from '@nestjs/common';
import { RequestLockUserDto } from '../../../admin/dtos/request-lock-user.dto';
import { CpanelService } from '../../../common/services/cpanel/cpanel.service';

@Injectable()
export class RagnarokLockService {
  constructor(private cpanelService: CpanelService) {}

  async lockUser(body: RequestLockUserDto) {
    try {
      await this.cpanelService.updateLockUser(body);
      return {
        message: 'Usuario actualizado',
      };
    } catch (error) {
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CpanelService } from '../../../common/services/cpanel/cpanel.service';
import { RequestSavePrizePvpDto } from '../../../prize-pvp/dtos/request-save-prize-pvp.dto';

@Injectable()
export class PrizePvpService {

    constructor(
        private cpanelService: CpanelService
    ) {}

    async getPrizesPvp(){
        try {
           const response = await this.cpanelService.getPrizesPvp()
           return response
        } catch (error) {
            throw error
        }
    }

    async savePrizePvp(body: RequestSavePrizePvpDto){
        try {
            const response = await this.cpanelService.savePrizePvp(body)
            return response   
        } catch (error) {
            throw error
        }
    }

    async deletePrizePvp(id: number){
        try {
            const response = await this.cpanelService.deletePrizePvp(id)
            return response
        } catch (error) {
            throw error
        }
    }
}

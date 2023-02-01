import { Injectable } from '@nestjs/common';
import { IRequestSavePrize } from 'src/common/interfaces/request-save-prize.interface';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { RequestSavePrizeDto } from '../../dtos/request-save-prize.dto';

@Injectable()
export class PrizeService {

    constructor(
        private cpanelService: CpanelService
    ){ }

    async savePrize(request: RequestSavePrizeDto){
        const { day, itemId, quantity } = request
        const requestSavePrize: IRequestSavePrize = {
            day,
            itemId,
            quantity
        }
        try {
            const response = await this.cpanelService.savePrize(requestSavePrize)
            return response
        } catch (error) {
            throw error            
        }
    }

    async getPrizes(){
        try {
            const response = await this.cpanelService.getPrizes()
            return response
        } catch (error) {
            throw error    
        }
    }

    async deletePrize(id: number){
        try {
            const response = await this.cpanelService.deletePrize(id)
            return response
        } catch (error) {
            throw error    
        }
    }

}

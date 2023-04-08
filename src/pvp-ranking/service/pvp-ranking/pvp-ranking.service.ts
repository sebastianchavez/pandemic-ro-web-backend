import { Injectable } from '@nestjs/common';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';

@Injectable()
export class PvpRankingService {

    constructor(
        private cpanelService: CpanelService
    ){}

    getPvpRanking(){
        return this.cpanelService.getPvpRanking()
    }
}

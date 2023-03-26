import { Injectable } from '@nestjs/common';
import { CpanelService } from '../../../common/services/cpanel/cpanel.service';

@Injectable()
export class ConnectionUserService {

    constructor(
        private cpanelService: CpanelService
    ){}

    getMyLastConnection(email: string){
        return this.cpanelService.getLastConnectionUser(email)
    }
}

import { Injectable } from '@nestjs/common';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';

@Injectable()
export class ConnectionUserService {

    constructor(
        private cpanelService: CpanelService
    ){}

    getMyLastConnection(email: string){
        return this.cpanelService.getLastConnectionUser(email)
    }
}

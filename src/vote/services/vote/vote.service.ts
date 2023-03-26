import { Injectable } from '@nestjs/common';
import { IRequestVote } from '../../../common/interfaces/request-vote.interface';
import { CpanelService } from '../../../common/services/cpanel/cpanel.service';
import { VoteDto } from '../../../vote/dtos/vote.dto';

@Injectable()
export class VoteService {
    
    constructor(
        private cpanelService: CpanelService
    ){}

    vote(request: VoteDto){
        const { email, ip, rank } = request
        const requestVote: IRequestVote = {
            email,
            ip,
            rank
        }
        return this.cpanelService.vote(requestVote)
    }

}

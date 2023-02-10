import { Injectable } from '@nestjs/common';
import { IRequestVote } from 'src/common/interfaces/request-vote.interface';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { VoteDto } from 'src/vote/dtos/vote.dto';

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

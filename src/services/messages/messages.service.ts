import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
// import { QueryConversationDto } from 'src/conversation/dtos/query-conversation.dto';
import { IRequestMessage } from 'src/interfaces/request-message.interface';
import { config } from 'dotenv'
config()

@Injectable()
export class MessagesService {
    private url1: string = 'api/messages/get-messages'
    private url2: string = 'api/messages/save-message'

    constructor(
        private httpService: HttpService
    ) { }

    // getMessages(query: QueryConversationDto) {
    //     const { MS_MESSAGES, PK_MS_MESSAGES } = process.env
    //     const apiUrl: string = `${MS_MESSAGES}${this.url1}?page=${query.page}&limit=${query.limit}&appId=italk&conversationId=${query.conversationId}`

    //     return firstValueFrom(this.httpService.get(apiUrl, {
    //         headers: {
    //             'Authorization': `Bearer ${PK_MS_MESSAGES}`
    //         }
    //     }))
    // }

    sendMessage(request: IRequestMessage) {
        const { MS_MESSAGES, PK_MS_MESSAGES } = process.env
        const apiUrl: string = `${MS_MESSAGES}${this.url2}`

        return firstValueFrom(this.httpService.post(apiUrl, request, {
            headers: {
                'Authorization': `Bearer ${PK_MS_MESSAGES}`
            }
        }))
    }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { config } from 'dotenv'
import { IRequestPushnotification } from 'src/interfaces/request-pushnotification.interface';
config()

@Injectable()
export class PushnotificationService {

    private url1: string = 'api/pushnotifications/send-push'
    private url2: string = 'api/pushnotifications/send-pushnotification'


    constructor(
        private httpService: HttpService
    ) { }

    sendPushnotification(request: IRequestPushnotification) {
        const { MS_PUSHNOTIFICATION, PK_MS_PUSHNOTIFICATION } = process.env
        const apiUrl: string = `${MS_PUSHNOTIFICATION}${this.url1}`
        return firstValueFrom(this.httpService.post(apiUrl, request, {
            headers: {
                'Authorization': `Bearer ${PK_MS_PUSHNOTIFICATION}`
            }
        }))
    }

    sendPushnotificationWithoutTemplate(request: IRequestPushnotification) {
        const { MS_PUSHNOTIFICATION, PK_MS_PUSHNOTIFICATION } = process.env
        const apiUrl: string = `${MS_PUSHNOTIFICATION}${this.url2}`
        return firstValueFrom(this.httpService.post(apiUrl, request, {
            headers: {
                'Authorization': `Bearer ${PK_MS_PUSHNOTIFICATION}`
            }
        }))
    }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { IWelcomeEmail } from 'src/interfaces/welcome-email.interface';
import { config } from 'dotenv'
config()

@Injectable()
export class EmailService {

    private url1: string = 'api/emails/send-email'


    constructor(
        private httpService: HttpService
    ) { }

    sendEmailWelcomeUser(welcomeEmail: IWelcomeEmail): Promise<AxiosResponse> {
        const { MS_EMAIL, PK_MS_EMAIL } = process.env
        const apiUrl: string = `${MS_EMAIL}${this.url1}`
        return firstValueFrom(this.httpService.post(apiUrl, welcomeEmail, {
            headers: {
                'Authorization': `Bearer ${PK_MS_EMAIL}`
            }
        }))
    }
}

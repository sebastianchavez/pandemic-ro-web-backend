import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { IRequestDeleteObjectS3, IRequestS3 } from '../../interfaces/request-s3.interface';
import { config } from 'dotenv'
config()

@Injectable()
export class S3Service {

    private url1: string = 'api/images/update-image'
    private url2: string = 'api/images/delete-image'

    constructor(
        private httpService: HttpService
    ) { }

    sendImageToS3(requestS3: IRequestS3): Promise<AxiosResponse> {
        const { MS_S3, PK_MS_S3 } = process.env
        const apiUrl: string = `${MS_S3}${this.url1}/${requestS3.appId}/${requestS3.category}`
        return firstValueFrom(this.httpService.post(apiUrl, requestS3, {
            headers: {
                'Authorization': `Bearer ${PK_MS_S3}`
            }
        }))
    }

    deleteImageFromS3(requestS3: IRequestDeleteObjectS3): Promise<AxiosResponse> {
        const { MS_S3, PK_MS_S3 } = process.env
        const apiUrl: string = `${MS_S3}${this.url2}/${requestS3.appId}`
        return firstValueFrom(this.httpService.post(apiUrl, requestS3, {
            headers: {
                'Authorization': `Bearer ${PK_MS_S3}`
            }
        }))
    }
}

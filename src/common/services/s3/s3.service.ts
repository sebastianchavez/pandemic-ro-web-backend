import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { IRequestDeleteObjectS3, IRequestFileS3, IRequestS3 } from '../../interfaces/request-s3.interface';
import { config } from 'dotenv'
config()

@Injectable()
export class S3Service {

    private url1: string = '/api/images/update-image'
    private url2: string = '/api/images/delete-image'
    private url3: string = '/api/files/update-file'

    constructor(
        private httpService: HttpService
    ) { }

    sendImageToS3(requestS3: IRequestS3): Promise<AxiosResponse> {
        const { URL_MS_S3, PK_MS_S3 } = process.env
        const apiUrl: string = `${URL_MS_S3}${this.url1}/${requestS3.appId}/${requestS3.category}`
        return firstValueFrom(this.httpService.post(apiUrl, requestS3, {
            headers: {
                'Authorization': `Bearer ${PK_MS_S3}`
            }
        }))
    }

    deleteImageFromS3(requestS3: IRequestDeleteObjectS3): Promise<AxiosResponse> {
        const { URL_MS_S3, PK_MS_S3 } = process.env
        const apiUrl: string = `${URL_MS_S3}${this.url2}/${requestS3.appId}`
        return firstValueFrom(this.httpService.post(apiUrl, requestS3, {
            headers: {
                'Authorization': `Bearer ${PK_MS_S3}`
            }
        }))
    }

    sendS3File(requestS3: IRequestFileS3) {
        const { URL_MS_S3, PK_MS_S3 } = process.env
        const apiUrl: string = `${URL_MS_S3}${this.url3}/${requestS3.appId}`
        return firstValueFrom(this.httpService.post(apiUrl, requestS3, {
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            headers: {
                'Authorization': `Bearer ${PK_MS_S3}`
            }
        }))
    }
}

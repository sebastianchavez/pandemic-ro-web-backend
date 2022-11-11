import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CpanelService {

    private url1: string = '/api/accounts/status'
    private url2: string = '/api/accounts/register'
    private url3: string = '/api/accounts/get-accounts'
    private url4: string = '/api/accounts/get-account'
    private url5: string = '/api/accounts/status'

    constructor(
        private httpService: HttpService
    ){}

    updateUser(request: any){

    }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IQueryGetChars } from 'src/common/interfaces/query-get-chars.interface';
import { IQueryGetLogin } from 'src/common/interfaces/query-get-login.interface';
import { IQueryGetLogins } from 'src/common/interfaces/query-get-logins.interface';
import { IRequestRegisterLogin } from 'src/common/interfaces/request-register-login.interface';
import { IRequestUpdateLockUser } from 'src/common/interfaces/request-update-lock-user.interface';

@Injectable()
export class CpanelService {

    private urlCpanel: string = process.env.URL_CPANEL

    constructor(
        private httpService: HttpService
    ){}

    async getLogins(query: IQueryGetLogins){
        try {
            let queryParams = ''
            let count = 0;
            for(let q in query){
                if(query[q]){
                    queryParams += count == 0 ? '?' : '&';
                    queryParams += q + '=' + query[q];
                }
                count++
            }
            const url = `${this.urlCpanel}/api/login/get-logins${queryParams}`
            console.log(url)
            const response = await firstValueFrom(this.httpService.get(url))
            return response.data
        } catch (error) {
            throw error
        }
    }

    async getLogin(userid: string){
        try {
            const url = `${this.urlCpanel}/api/login/get-login?userid=${userid}`
            const response = await firstValueFrom(this.httpService.get(url))
            return response.data
        } catch (error) {
            throw error
        }
    }

    async registerLogin(request: IRequestRegisterLogin){
        try {
            const url = `${this.urlCpanel}/api/login/register`
            const response = await firstValueFrom(this.httpService.post(url, request))
            return response.data
        } catch (error) {
            throw error
        }
    }

    async getInfoCpanel(){
        try {
            const url = `${this.urlCpanel}/api/health/status`
            const response = await firstValueFrom(this.httpService.get(url))
            return response.data
        } catch (error) {
            throw error            
        }
    }

    async getChars(query: IQueryGetChars){
        try {
            let queryParams = ''
            let count = 0;
            for(let q in query){
                if(query[q]){
                    queryParams += count == 0 ? '?' : '&';
                    queryParams += q + '=' + query[q];
                }
                count++
            }
            const url = `${this.urlCpanel}/api/char/get-chars${queryParams}`
            const response = await firstValueFrom(this.httpService.get(url))
            return response.data
        } catch (error) {
            throw error
        }
    }

    async updateLockUser(request: IRequestUpdateLockUser){
        try {
            const url = `${this.urlCpanel}/api/lock/update-lock-user`
            const response = await firstValueFrom(this.httpService.put(url, request))
            return response.data
        } catch (error) {
            console.log('error:', request)
            throw error
        }
    }
}

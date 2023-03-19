import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { IRequestUpdateDevice } from 'src/common/interfaces/request-update-device.interface';
import { IQueryGetChars } from 'src/common/interfaces/query-get-chars.interface';
import { IQueryGetItems } from 'src/common/interfaces/query-get-items.interface';
import { IQueryGetLogins } from 'src/common/interfaces/query-get-logins.interface';
import { IQueryGetProcessLock } from 'src/common/interfaces/query-get-process-lock.interface';
import { IRequestRegisterLogin } from 'src/common/interfaces/request-register-login.interface';
import { IRequestSavePrize } from 'src/common/interfaces/request-save-prize.interface';
import { IRequestSaveProcessLock } from 'src/common/interfaces/request-save-process-lock.interface';
import { IRequestUpdateLockUser } from 'src/common/interfaces/request-update-lock-user.interface';
import { IRequestUpdateProcessLock } from 'src/common/interfaces/request-update-process-lock.interface';
import { IRequestVote } from 'src/common/interfaces/request-vote.interface';
import { IRequestDisconnectDevice } from 'src/common/interfaces/request-disconnect-device.interface';
import { RequestSavePrizePvpDto } from 'src/prize-pvp/dtos/request-save-prize-pvp.dto';

@Injectable()
export class CpanelService {
  private urlCpanel: string = process.env.URL_CPANEL;

  constructor(private httpService: HttpService) {}

  async getLogins(query: IQueryGetLogins) {
    try {
      let queryParams = '';
      let count = 0;
      for (const q in query) {
        if (query[q]) {
          queryParams += count == 0 ? '?' : '&';
          queryParams += q + '=' + query[q];
        }
        count++;
      }
      const url = `${this.urlCpanel}/api/login/get-logins${queryParams}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getLogin(email: string) {
    try {
      const url = `${this.urlCpanel}/api/login/get-login?email=${email}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async registerLogin(request: IRequestRegisterLogin) {
    try {
      const url = `${this.urlCpanel}/api/login/register`;
      const response = await firstValueFrom(
        this.httpService.post(url, request),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getInfoCpanel() {
    try {
      const url = `${this.urlCpanel}/api/health/status`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getChars(query: IQueryGetChars) {
    try {
      let queryParams = '';
      let count = 0;
      for (const q in query) {
        if (query[q]) {
          queryParams += count == 0 ? '?' : '&';
          queryParams += q + '=' + query[q];
        }
        count++;
      }
      const url = `${this.urlCpanel}/api/char/get-chars${queryParams}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateLockUser(request: IRequestUpdateLockUser) {
    try {
      const url = `${this.urlCpanel}/api/lock/update-lock-user`;
      const response = await firstValueFrom(this.httpService.put(url, request));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getProcessLock(query: IQueryGetProcessLock) {
    try {
      let queryParams: string = '';
      let counter: number = 0;
      for await(let q of Object.keys(query)){
        if(query[q] && query[q] != ''){
          if(counter == 0){
            queryParams += `?${q}=${query[q]}`
          } else {
            queryParams += `&${q}=${query[q]}`
          }
          counter++;
        }
      }
      const url = `${this.urlCpanel}/api/process-lock/get-process-lock${queryParams}`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async saveProcessLock(request: IRequestSaveProcessLock) {
    try {
      const url = `${this.urlCpanel}/api/process-lock/save-process-lock`;
      const response = await firstValueFrom(
        this.httpService.post(url, request),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateProcessLock(request: IRequestUpdateProcessLock) {
    try {
      const url = `${this.urlCpanel}/api/process-lock/update-process-lock`;
      const response = await firstValueFrom(this.httpService.put(url, request));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteProcessLock(id: number) {
    try {
      const url = `${this.urlCpanel}/api/process-lock/delete-process-lock/${id}`;
      const response = await firstValueFrom(this.httpService.delete(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getItems(query: IQueryGetItems){
    try {
      let queryParams: string = '';
      let counter: number = 0;
      for await(let q of Object.keys(query)){
        if(query[q] && query[q] != ''){
          if(counter == 0){
            queryParams += `?${q}=${query[q]}`
          } else {
            queryParams += `&${q}=${query[q]}`
          }
          counter++;
        }
      }
      const url = `${this.urlCpanel}/api/items/get-items${queryParams}`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async savePrize(request: IRequestSavePrize){
    try {
      const url = `${this.urlCpanel}/api/prizes/save-prize`;
      const response = await firstValueFrom(
        this.httpService.post(url, request),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPrizes(){
    try {
      const url = `${this.urlCpanel}/api/prizes/get-prizes`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deletePrize(id: number){
    try {
      const url = `${this.urlCpanel}/api/prizes/delete-prize/${id}`;
      const response = await firstValueFrom(this.httpService.delete(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getLastConnectionUser(email:string) {
    try {
      const url = `${this.urlCpanel}/api/connection-user/get-my-last-connection?email=${email}`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateDevice(request: IRequestUpdateDevice){
    try {
      const url = `${this.urlCpanel}/api/device/update-device`;
      const response = await lastValueFrom(this.httpService.put(url, request));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  
  async disconnectDevice(request: IRequestDisconnectDevice){
    try {
      const url = `${this.urlCpanel}/api/device/disconnect-device`;
      const response = await lastValueFrom(this.httpService.put(url, request));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async vote(request: IRequestVote){
    try {
      const url = `${this.urlCpanel}/api/vote`;
      const response = await lastValueFrom(this.httpService.put(url, request));
      return response.data;
    } catch (error) {
      throw error
    }
  }

  async getPrizesPvp(){
    try {
      const url = `${this.urlCpanel}/api/prize-pvp/get-prizes-pvp`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.log('error:', error);
      
      throw error
    }
  }

  async savePrizePvp(request: RequestSavePrizePvpDto){
    try {
      const url = `${this.urlCpanel}/api/prize-pvp/save-prize-pvp`;
      const response = await lastValueFrom(this.httpService.post(url, request));
      return response.data;
    } catch (error) {
      throw error
    }
  }

  async deletePrizePvp(id: number){
    try {
      const url = `${this.urlCpanel}/api/prize-pvp/delete-prize-pvp/${id}`;
      const response = await lastValueFrom(this.httpService.delete(url));
      return response.data;
    } catch (error) {
      throw error
    }
  }
}

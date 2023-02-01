import { Injectable } from '@nestjs/common';
import { IQueryGetProcessLock } from 'src/common/interfaces/query-get-process-lock.interface';
import { IRequestSaveProcessLock } from 'src/common/interfaces/request-save-process-lock.interface';
import { IRequestUpdateProcessLock } from 'src/common/interfaces/request-update-process-lock.interface';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';
import { QueryProcessLockDto } from 'src/process-lock/dtos/query-process-lock.dto';
import { SaveProcessLockDto } from 'src/process-lock/dtos/save-process-lock.dto';
import { UpdateProcessLockDto } from 'src/process-lock/dtos/update-process-lock.dto';

@Injectable()
export class ProcessLockService {
  constructor(private cpanelService: CpanelService) {}

  getProcessLock(query: QueryProcessLockDto) {
    try {
      const queryParams: IQueryGetProcessLock = {
        ...query
      }
      return this.cpanelService.getProcessLock(queryParams);
    } catch (error) {
      throw error;
    }
  }

  saveProcessLock(saveProcessLockDto: SaveProcessLockDto) {
    try {
      const request: IRequestSaveProcessLock = {
        ...saveProcessLockDto
      }
      return this.cpanelService.saveProcessLock(request)
    } catch (error) {
      throw error;
    }
  }

  updateProcessLock(updateProcessLockDto: UpdateProcessLockDto) {
    try {
      const request: IRequestUpdateProcessLock = {
        ...updateProcessLockDto
      }
      return this.cpanelService.updateProcessLock(request)
    } catch (error) {
      throw error;
    }
  }

  deleteProcessLock(id: number) {
    try {
      return this.cpanelService.deleteProcessLock(id)
    } catch (error) {
      throw error;
    }
  }
}

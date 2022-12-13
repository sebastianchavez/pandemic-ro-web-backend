import { Injectable } from '@nestjs/common';
import { CpanelService } from 'src/common/services/cpanel/cpanel.service';

@Injectable()
export class ProcessLockService {
  constructor(private cpanelService: CpanelService) {}

  getProcessLock() {
    try {
      this.cpanelService.getProcessLock();
    } catch (error) {
      throw error;
    }
  }

  saveProcessLock() {
    try {
    } catch (error) {
      throw error;
    }
  }

  updateProcessLock() {
    try {
    } catch (error) {
      throw error;
    }
  }

  deleteProcessLock() {
    try {
    } catch (error) {
      throw error;
    }
  }
}

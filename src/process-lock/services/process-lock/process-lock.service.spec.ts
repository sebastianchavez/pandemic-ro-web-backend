import { Test, TestingModule } from '@nestjs/testing';
import { ProcessLockService } from './process-lock.service';

describe('ProcessLockService', () => {
  let service: ProcessLockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcessLockService],
    }).compile();

    service = module.get<ProcessLockService>(ProcessLockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

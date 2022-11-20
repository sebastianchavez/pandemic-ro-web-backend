import { Test, TestingModule } from '@nestjs/testing';
import { RagnarokLockService } from './ragnarok-lock.service';

describe('RagnarokLockService', () => {
  let service: RagnarokLockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RagnarokLockService],
    }).compile();

    service = module.get<RagnarokLockService>(RagnarokLockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

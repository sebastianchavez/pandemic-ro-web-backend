import { Test, TestingModule } from '@nestjs/testing';
import { RagnarokServerService } from './ragnarok-server.service';

describe('RagnarokServiceService', () => {
  let service: RagnarokServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RagnarokServerService],
    }).compile();

    service = module.get<RagnarokServerService>(RagnarokServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

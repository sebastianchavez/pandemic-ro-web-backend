import { Test, TestingModule } from '@nestjs/testing';
import { RagnarokCharService } from './ragnarok-char.service';

describe('RagnarokLoginService', () => {
  let service: RagnarokCharService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RagnarokCharService],
    }).compile();

    service = module.get<RagnarokCharService>(RagnarokCharService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

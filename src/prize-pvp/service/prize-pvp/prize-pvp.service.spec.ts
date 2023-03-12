import { Test, TestingModule } from '@nestjs/testing';
import { PrizePvpService } from './prize-pvp.service';

describe('PrizePvpService', () => {
  let service: PrizePvpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrizePvpService],
    }).compile();

    service = module.get<PrizePvpService>(PrizePvpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

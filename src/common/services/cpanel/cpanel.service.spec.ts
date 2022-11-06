import { Test, TestingModule } from '@nestjs/testing';
import { CpanelService } from './cpanel.service';

describe('CpanelService', () => {
  let service: CpanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CpanelService],
    }).compile();

    service = module.get<CpanelService>(CpanelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

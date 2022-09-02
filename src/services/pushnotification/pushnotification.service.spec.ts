import { Test, TestingModule } from '@nestjs/testing';
import { PushnotificationService } from './pushnotification.service';

describe('PushnotificationService', () => {
  let service: PushnotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PushnotificationService],
    }).compile();

    service = module.get<PushnotificationService>(PushnotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

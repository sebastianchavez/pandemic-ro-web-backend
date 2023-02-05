import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionUserService } from './connection-user.service';

describe('ConnectionUserService', () => {
  let service: ConnectionUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConnectionUserService],
    }).compile();

    service = module.get<ConnectionUserService>(ConnectionUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

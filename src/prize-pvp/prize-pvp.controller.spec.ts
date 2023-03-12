import { Test, TestingModule } from '@nestjs/testing';
import { PrizePvpController } from './prize-pvp.controller';

describe('PrizePvpController', () => {
  let controller: PrizePvpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrizePvpController],
    }).compile();

    controller = module.get<PrizePvpController>(PrizePvpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RagnarokServerController } from './ragnarok-server.controller';

describe('RagnarokServerController', () => {
  let controller: RagnarokServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RagnarokServerController],
    }).compile();

    controller = module.get<RagnarokServerController>(RagnarokServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

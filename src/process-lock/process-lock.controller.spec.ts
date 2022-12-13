import { Test, TestingModule } from '@nestjs/testing';
import { ProcessLockController } from './process-lock.controller';

describe('ProcessLockController', () => {
  let controller: ProcessLockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessLockController],
    }).compile();

    controller = module.get<ProcessLockController>(ProcessLockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

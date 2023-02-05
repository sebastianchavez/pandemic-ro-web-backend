import { Test, TestingModule } from '@nestjs/testing';
import { ConnectionUserController } from './connection-user.controller';

describe('ConnectionUserController', () => {
  let controller: ConnectionUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConnectionUserController],
    }).compile();

    controller = module.get<ConnectionUserController>(ConnectionUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

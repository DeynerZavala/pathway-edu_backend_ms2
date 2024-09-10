import { Test, TestingModule } from '@nestjs/testing';
import { UserTestResponsesController } from './user-test-responses.controller';

describe('UserTestResponsesController', () => {
  let controller: UserTestResponsesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTestResponsesController],
    }).compile();

    controller = module.get<UserTestResponsesController>(UserTestResponsesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

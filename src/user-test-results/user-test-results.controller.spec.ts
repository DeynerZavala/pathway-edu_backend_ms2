import { Test, TestingModule } from '@nestjs/testing';
import { UserTestResultsController } from './user-test-results.controller';

describe('UserTestResultsController', () => {
  let controller: UserTestResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTestResultsController],
    }).compile();

    controller = module.get<UserTestResultsController>(UserTestResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

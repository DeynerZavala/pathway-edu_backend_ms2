import { Test, TestingModule } from '@nestjs/testing';
import { TestTemplateController } from './test-template.controller';

describe('TestTemplateController', () => {
  let controller: TestTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestTemplateController],
    }).compile();

    controller = module.get<TestTemplateController>(TestTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

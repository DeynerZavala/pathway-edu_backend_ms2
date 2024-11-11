import { Test, TestingModule } from '@nestjs/testing';
import { TestTemplateService } from './test-template.service';

describe('TestTemplateService', () => {
  let service: TestTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestTemplateService],
    }).compile();

    service = module.get<TestTemplateService>(TestTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

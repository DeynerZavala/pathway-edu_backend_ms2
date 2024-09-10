import { Test, TestingModule } from '@nestjs/testing';
import { UserTestResponsesService } from './user-test-responses.service';

describe('UserTestResponsesService', () => {
  let service: UserTestResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTestResponsesService],
    }).compile();

    service = module.get<UserTestResponsesService>(UserTestResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

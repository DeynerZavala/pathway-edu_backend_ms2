import { Test, TestingModule } from '@nestjs/testing';
import { UserTestResultsService } from './user-test-results.service';

describe('UserTestResultsService', () => {
  let service: UserTestResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTestResultsService],
    }).compile();

    service = module.get<UserTestResultsService>(UserTestResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

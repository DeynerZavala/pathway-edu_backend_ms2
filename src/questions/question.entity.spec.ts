import { Question } from './question.entity';

describe('Question', () => {
  it('should be defined', () => {
    expect(new Question()).toBeDefined();
  });
});

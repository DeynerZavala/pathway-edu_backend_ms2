import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Test } from '../tests/test.entity';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';

@Entity('user_test_responses')
export class UserTestResponse {
  @PrimaryGeneratedColumn('uuid')
  response_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Test, (test) => test.userTestResponses)
  test: Test;

  @ManyToOne(() => Question, (question) => question.userTestResponses)
  question: Question;

  @ManyToOne(() => Answer, (answer) => answer.userTestResponses)
  answer: Answer;

  @Column()
  attempt_number: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  response_date: Date;
}

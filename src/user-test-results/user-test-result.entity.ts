import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Test } from '../tests/test.entity';

@Entity('user_test_results')
export class UserTestResult {
  @PrimaryGeneratedColumn('uuid')
  result_id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Test, (test) => test.userTestResults)
  test: Test;

  @Column({ type: 'text' })
  result_text: string;

  @Column()
  attempt_number: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  completion_date: Date;
}

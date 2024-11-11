import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Question } from '../questions/question.entity';
import { UserTestResponse } from '../user-test-responses/user-test-response.entity';
import { UserTestResult } from '../user-test-results/user-test-result.entity';
import { TestTemplate } from 'src/test-template/test-template.enity';

@Entity('tests')
export class Test {
  @PrimaryGeneratedColumn('uuid')
  test_id: string;

  @Column({ length: 255 })
  test_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamptz' })
  date_creation: Date;

  // Relación con la entidad `Question`
  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];

  // Relación con la entidad `UserTestResponse`
  @OneToMany(() => UserTestResponse, (userTestResponse) => userTestResponse.test)
  userTestResponses: UserTestResponse[];

  // Relación con la entidad `TestTemplate`
  @OneToMany(()=> TestTemplate,(testTemplate) => testTemplate.test)
  testTemplate: TestTemplate[];

  // Relación con la entidad `UserTestResult`
  @OneToMany(() => UserTestResult, (userTestResult) => userTestResult.test)
  userTestResults: UserTestResult[];
}

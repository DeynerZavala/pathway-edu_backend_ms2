import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Test } from '../tests/test.entity';
import { UserTestResponse } from '../user-test-responses/user-test-response.entity';
import { Answer } from '../answers/answer.entity';
import { Area } from '../areas/area.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  question_id: string;

  @Column('text')
  question_text: string;

  @ManyToOne(() => Test, (test) => test.questions)
  test: Test;

  @ManyToOne(() => Area, (area) => area.questions)
  area: Area;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  // Relación inversa con UserTestResponse
  @OneToMany(() => UserTestResponse, (userTestResponse) => userTestResponse.question)
  userTestResponses: UserTestResponse[];
}

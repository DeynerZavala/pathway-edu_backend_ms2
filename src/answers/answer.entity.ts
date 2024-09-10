import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Question } from '../questions/question.entity';
import { UserTestResponse } from '../user-test-responses/user-test-response.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  answer_id: string;

  @Column('text')
  answer_text: string;

  @Column('int')
  score: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  // Relación inversa con UserTestResponse
  @OneToMany(() => UserTestResponse, (userTestResponse) => userTestResponse.answer)
  userTestResponses: UserTestResponse[];
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from '../questions/question.entity';

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  area_id: string;

  @Column({ length: 255 })
  area_name: string;

  @OneToMany(() => Question, (question) => question.area)
  questions: Question[];
}

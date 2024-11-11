import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from '../questions/question.entity';
import { TestTemplate } from '../test-template/test-template.enity';
import { UserTestResult } from 'src/user-test-results/user-test-result.entity';

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  area_id: string;

  @Column({ length: 255 })
  area_name: string;

  @Column('text', { unique: true })
  description: string;

  @OneToMany(() => Question, (question) => question.area)
  questions: Question[];

  @OneToMany(()=>UserTestResult,(userTestResult)=>userTestResult.area)
  userTestResults: UserTestResult[];

  @OneToMany(()=>TestTemplate,(testTemplate)=> testTemplate.area)
  testTemplates: TestTemplate[];

}

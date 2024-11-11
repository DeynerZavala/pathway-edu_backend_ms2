import { Area } from '../areas/area.entity';
import { Test } from '../tests/test.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('test_template')
export class TestTemplate {
  @PrimaryGeneratedColumn('uuid')
  template_id: string;

  @ManyToOne(()=> Test, (test)=> test.testTemplate)
  test:Test;

  @ManyToOne(()=>Area,(area)=>area.testTemplates)
  area:Area;

  @Column('int')
  min: number;
  
  @Column('int')
  max: number;

}

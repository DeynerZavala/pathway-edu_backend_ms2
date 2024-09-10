import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  // CREATE
  async create(questionData: Partial<Question>): Promise<Question> {
    const newQuestion = this.questionRepository.create(questionData);
    return await this.questionRepository.save(newQuestion);
  }

  // READ all
  async findAll(): Promise<Question[]> {
    return await this.questionRepository.find({ relations: ['test'] });
  }

  // READ one
  async findOne(id: string): Promise<Question> {
    return await this.questionRepository.findOne({ where: { question_id: id }, relations: ['test'] });
  }

  // UPDATE
  async update(id: string, updateData: Partial<Question>): Promise<Question> {
    await this.questionRepository.update(id, updateData);
    return this.findOne(id);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    await this.questionRepository.delete(id);
  }
}

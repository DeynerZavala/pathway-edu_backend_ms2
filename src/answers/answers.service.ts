import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  // CREATE
  async create(answerData: Partial<Answer>): Promise<Answer> {
    const newAnswer = this.answerRepository.create(answerData);
    return await this.answerRepository.save(newAnswer);
  }

  // READ all
  async findAll(): Promise<Answer[]> {
    return await this.answerRepository.find({ relations: ['question'] });
  }

  // READ one
  async findOne(id: string): Promise<Answer> {
    return await this.answerRepository.findOne({ where: { answer_id: id }, relations: ['question'] });
  }

  // UPDATE
  async update(id: string, updateData: Partial<Answer>): Promise<Answer> {
    await this.answerRepository.update(id, updateData);
    return this.findOne(id);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    await this.answerRepository.delete(id);
  }
}

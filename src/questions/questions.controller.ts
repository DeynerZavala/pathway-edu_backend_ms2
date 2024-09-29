import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // CREATE
  @MessagePattern({ cmd: 'create_question' })
  async create(questionData: Partial<Question>): Promise<Question> {
    return this.questionsService.create(questionData);
  }

  // READ all
  @MessagePattern({ cmd: 'get_all_questions' })
  async findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  // READ one
  @MessagePattern({ cmd: 'get_question_by_id' })
  async findOne(id: string): Promise<Question> {
    return this.questionsService.findOne(id);
  }

  // UPDATE
  @MessagePattern({ cmd: 'update_question' })
  async update(data: { id: string; updateData: Partial<Question> }): Promise<Question> {
    const { id, updateData } = data;
    return this.questionsService.update(id, updateData);
  }

  // DELETE
  @MessagePattern({ cmd: 'delete_question' })
  async remove(id: string): Promise<void> {
    return this.questionsService.remove(id);
  }
}

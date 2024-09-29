import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Answer } from './answer.entity';
import { AnswersService } from './answers.service';

@Controller()
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  // CREATE
  @MessagePattern({ cmd: 'create_answer' })
  async create(answerData: Partial<Answer>): Promise<Answer> {
    return this.answersService.create(answerData);
  }

  // READ all
  @MessagePattern({ cmd: 'get_all_answers' })
  async findAll(): Promise<Answer[]> {
    return this.answersService.findAll();
  }

  // READ one
  @MessagePattern({ cmd: 'get_answer_by_id' })
  async findOne(id: string): Promise<Answer> {
    return this.answersService.findOne(id);
  }

  // UPDATE
  @MessagePattern({ cmd: 'update_answer' })
  async update(data: { id: string; updateData: Partial<Answer> }): Promise<Answer> {
    const { id, updateData } = data;
    return this.answersService.update(id, updateData);
  }

  // DELETE
  @MessagePattern({ cmd: 'delete_answer' })
  async remove(id: string): Promise<void> {
    return this.answersService.remove(id);
  }
}

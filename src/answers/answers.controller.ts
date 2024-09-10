import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { Answer } from './answer.entity';

@Controller('api/v2/answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  // CREATE
  @Post()
  async create(@Body() answerData: Partial<Answer>): Promise<Answer> {
    return this.answersService.create(answerData);
  }

  // READ all
  @Get()
  async findAll(): Promise<Answer[]> {
    return this.answersService.findAll();
  }

  // READ one
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Answer> {
    return this.answersService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Answer>): Promise<Answer> {
    return this.answersService.update(id, updateData);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.answersService.remove(id);
  }
}

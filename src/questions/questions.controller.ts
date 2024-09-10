import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './question.entity';

@Controller('api/v2/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // CREATE
  @Post()
  async create(@Body() questionData: Partial<Question>): Promise<Question> {
    return this.questionsService.create(questionData);
  }

  // READ all
  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionsService.findAll();
  }

  // READ one
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Question> {
    return this.questionsService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Question>): Promise<Question> {
    return this.questionsService.update(id, updateData);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.questionsService.remove(id);
  }
}

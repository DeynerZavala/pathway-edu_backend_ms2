import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TestsService } from './tests.service';
import { Test } from './test.entity';

@Controller('api/tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  // CREATE
  @Post()
  async create(@Body() testData: Partial<Test>): Promise<Test> {
    return this.testsService.create(testData);
  }

  // READ all
  @Get()
  async findAll(): Promise<Test[]> {
    return this.testsService.findAll();
  }

  // READ one
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Test> {
    return this.testsService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Test>): Promise<Test> {
    return this.testsService.update(id, updateData);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.testsService.remove(id);
  }

  // @Get('all')
  // async getAllTests(): Promise<Test[]> {
  //   return this.testsService.getAllTests();
  // }

  @Get('all/:id')
  async getTestById(@Param('id') id: string): Promise<Test> {
    return this.testsService.getTestById(id);
  }
}

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserTestResultsService } from './user-test-results.service';
import { UserTestResult } from './user-test-result.entity';
import { Area } from '../areas/area.entity';


@Controller('api/user-test-results')
export class UserTestResultsController {
  constructor(private readonly userTestResultsService: UserTestResultsService,) {}

  // CREATE
  @Post()
  async create(@Body() resultData: Partial<UserTestResult>): Promise<UserTestResult> {
    return this.userTestResultsService.create(resultData);
  }

  // READ all
  @Get()
  async findAll(): Promise<UserTestResult[]> {
    return this.userTestResultsService.findAll();
  }

  // READ one
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserTestResult> {
    return this.userTestResultsService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<UserTestResult>): Promise<UserTestResult> {
    return this.userTestResultsService.update(id, updateData);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userTestResultsService.remove(id);
  }
  
  @Post('submit')
  async submitTestResponses(@Body() body: any) {
    return this.userTestResultsService.submitTestResponses(body);
  }
}

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserTestResponsesService } from './user-test-responses.service';
import { UserTestResponse } from './user-test-response.entity';

@Controller('user-test-responses')
export class UserTestResponsesController {
  constructor(private readonly userTestResponsesService: UserTestResponsesService) {}

  // CREATE
  @Post()
  async create(@Body() responseData: Partial<UserTestResponse>): Promise<UserTestResponse> {
    return this.userTestResponsesService.create(responseData);
  }

  // READ all
  @Get()
  async findAll(): Promise<UserTestResponse[]> {
    return this.userTestResponsesService.findAll();
  }

  // READ one
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserTestResponse> {
    return this.userTestResponsesService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<UserTestResponse>): Promise<UserTestResponse> {
    return this.userTestResponsesService.update(id, updateData);
  }

  // DELETE
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userTestResponsesService.remove(id);
  }
}

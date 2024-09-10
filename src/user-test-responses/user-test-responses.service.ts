import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTestResponse } from './user-test-response.entity';

@Injectable()
export class UserTestResponsesService {
  constructor(
    @InjectRepository(UserTestResponse)
    private userTestResponseRepository: Repository<UserTestResponse>,
  ) {}

  // CREATE
  async create(responseData: Partial<UserTestResponse>): Promise<UserTestResponse> {
    const newResponse = this.userTestResponseRepository.create(responseData);
    return await this.userTestResponseRepository.save(newResponse);
  }

  // READ all
  async findAll(): Promise<UserTestResponse[]> {
    return await this.userTestResponseRepository.find({ relations: ['test', 'question', 'answer'] });
  }

  // READ one
  async findOne(id: string): Promise<UserTestResponse> {
    return await this.userTestResponseRepository.findOne({ where: { response_id: id }, relations: ['test', 'question', 'answer'] });
  }

  // UPDATE
  async update(id: string, updateData: Partial<UserTestResponse>): Promise<UserTestResponse> {
    await this.userTestResponseRepository.update(id, updateData);
    return this.findOne(id);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    await this.userTestResponseRepository.delete(id);
  }
}

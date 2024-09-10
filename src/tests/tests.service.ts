import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './test.entity';

@Injectable()
export class TestsService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  // CREATE
  async create(testData: Partial<Test>): Promise<Test> {
    const newTest = this.testRepository.create(testData);
    return await this.testRepository.save(newTest);
  }

  // READ all
  async findAll(): Promise<Test[]> {
    return await this.testRepository.find();
  }

  // READ one
  async findOne(id: string): Promise<Test> {
    return await this.testRepository.findOne({ where: { test_id: id } });
  }

  // UPDATE
  async update(id: string, updateData: Partial<Test>): Promise<Test> {
    await this.testRepository.update(id, updateData);
    return this.findOne(id); // Devolver el test actualizado
  }

  // DELETE
  async remove(id: string): Promise<void> {
    await this.testRepository.delete(id);
  }
    // Obtener todos los tests
    async getAllTests(): Promise<Test[]> {
      return this.testRepository.find({
        relations: ['questions', 'questions.area', 'questions.answers'],  // Incluir preguntas, áreas y respuestas
      });
    }
    
    // Obtener un test por ID con todas las preguntas, áreas y respuestas relacionadas
    async getTestById(testId: string): Promise<Test> {
      return this.testRepository.findOne({
        where: { test_id: testId },
        relations: ['questions', 'questions.area', 'questions.answers'],  // Incluir relaciones
      });
    }
}

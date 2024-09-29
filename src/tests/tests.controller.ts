import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Test } from './test.entity';
import { TestsService } from './tests.service';

@Controller()
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  // CREATE: Escucha el comando para crear una prueba
  @MessagePattern({ cmd: 'create_test' })
  async create(testData: Partial<Test>): Promise<Test> {
    return this.testsService.create(testData);
  }

  // READ all: Escucha el comando para obtener todas las pruebas
  @MessagePattern({ cmd: 'get_all_tests' })
  async findAll(): Promise<Test[]> {
    return this.testsService.findAll();
  }

  // READ one: Escucha el comando para obtener una prueba por ID
  @MessagePattern({ cmd: 'get_test_by_id' })
  async findOne(id: string): Promise<Test> {
    return this.testsService.findOne(id);
  }

  // UPDATE: Escucha el comando para actualizar una prueba
  @MessagePattern({ cmd: 'update_test' })
  async update(data: { id: string; updateData: Partial<Test> }): Promise<Test> {
    const { id, updateData } = data;
    return this.testsService.update(id, updateData);
  }

  // DELETE: Escucha el comando para eliminar una prueba por ID
  @MessagePattern({ cmd: 'delete_test' })
  async remove(id: string): Promise<void> {
    return this.testsService.remove(id);
  }

  // GET: Escucha el comando para obtener una prueba por un ID personalizado
  @MessagePattern({ cmd: 'get_test_by_custom_id' })
  async getTestByCustomId(id: string): Promise<Test> {
    return this.testsService.getTestById(id);
  }
}

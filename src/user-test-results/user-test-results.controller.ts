import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserTestResultsService } from './user-test-results.service';
import { UserTestResult } from './user-test-result.entity';

@Controller()
export class UserTestResultsController {
  constructor(private readonly userTestResultsService: UserTestResultsService) {}

  // CREATE: Escucha el comando para crear un resultado de prueba
  @MessagePattern({ cmd: 'create_user_test_result' })
  async create(resultData: Partial<UserTestResult>): Promise<UserTestResult> {
    return this.userTestResultsService.create(resultData);
  }

  // READ all: Escucha el comando para obtener todos los resultados de prueba
  @MessagePattern({ cmd: 'get_all_user_test_results' })
  async findAll(): Promise<UserTestResult[]> {
    return this.userTestResultsService.findAll();
  }

  // READ one: Escucha el comando para obtener un resultado de prueba por ID
  @MessagePattern({ cmd: 'get_user_test_result_by_id' })
  async findOne(id: string): Promise<UserTestResult> {
    return this.userTestResultsService.findOne(id);
  }

  // UPDATE: Escucha el comando para actualizar un resultado de prueba
  @MessagePattern({ cmd: 'update_user_test_result' })
  async update(data: { id: string; updateData: Partial<UserTestResult> }): Promise<UserTestResult> {
    const { id, updateData } = data;
    return this.userTestResultsService.update(id, updateData);
  }

  // DELETE: Escucha el comando para eliminar un resultado de prueba por ID
  @MessagePattern({ cmd: 'delete_user_test_result' })
  async remove(id: string): Promise<void> {
    return this.userTestResultsService.remove(id);
  }

  // POST: Escucha el comando para enviar respuestas de prueba y generar un resultado
  @MessagePattern({ cmd: 'submit_test_responses' })
  async submitTestResponses(body: any): Promise<any> {
    return this.userTestResultsService.submitTestResponses(body);
  }
}

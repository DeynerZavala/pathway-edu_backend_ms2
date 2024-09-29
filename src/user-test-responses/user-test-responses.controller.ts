import { Controller, Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserTestResponsesService } from './user-test-responses.service';
import { UserTestResponse } from './user-test-response.entity';

@Controller()
export class UserTestResponsesController {
  constructor(private readonly userTestResponsesService: UserTestResponsesService) {}

  // CREATE: Escucha el comando para crear una respuesta de prueba de usuario
  @MessagePattern({ cmd: 'create_user_test_response' })
  async create(responseData: Partial<UserTestResponse>): Promise<UserTestResponse> {
    return this.userTestResponsesService.create(responseData);
  }

  // READ all: Escucha el comando para obtener todas las respuestas de prueba de usuario
  @MessagePattern({ cmd: 'get_all_user_test_responses' })
  async findAll(): Promise<UserTestResponse[]> {
    return this.userTestResponsesService.findAll();
  }

  // READ one: Escucha el comando para obtener una respuesta de prueba de usuario por ID
  @MessagePattern({ cmd: 'get_user_test_response_by_id' })
  async findOne(id: string): Promise<UserTestResponse> {
    return this.userTestResponsesService.findOne(id);
  }

  // UPDATE: Escucha el comando para actualizar una respuesta de prueba de usuario
  @MessagePattern({ cmd: 'update_user_test_response' })
  async update(data: { id: string; updateData: Partial<UserTestResponse> }): Promise<UserTestResponse> {
    const { id, updateData } = data;
    return this.userTestResponsesService.update(id, updateData);
  }

  // DELETE: Escucha el comando para eliminar una respuesta de prueba de usuario por ID
  @MessagePattern({ cmd: 'delete_user_test_response' })
  async remove(id: string): Promise<void> {
    return this.userTestResponsesService.remove(id);
  }
}

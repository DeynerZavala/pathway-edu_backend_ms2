import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTestResponse } from './user-test-response.entity';
import { UserTestResponsesService } from './user-test-responses.service';
import { UserTestResponsesController } from './user-test-responses.controller';


@Module({
  imports: [TypeOrmModule.forFeature([UserTestResponse])], 
   // Importar el repositorio de la entidad UserTestResponse
  providers: [UserTestResponsesService],  // Proveedor del servicio para manejar lógica de negocios
  controllers: [UserTestResponsesController],  // Controlador que maneja las rutas para esta entidad
})
export class UserTestResponsesModule {}

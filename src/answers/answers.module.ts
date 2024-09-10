import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],  // Importar el repositorio de la entidad Answer
  providers: [AnswersService],  // Proveedor del servicio para manejar lógica de negocios
  controllers: [AnswersController],  // Controlador que maneja las rutas para esta entidad
})
export class AnswersModule {}

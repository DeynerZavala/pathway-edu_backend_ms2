import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTestResult } from './user-test-result.entity';
import { UserTestResultsService } from './user-test-results.service';
import { UserTestResultsController } from './user-test-results.controller';
import { UserTestResponse } from '../user-test-responses/user-test-response.entity';
import { QuestionsModule } from '../questions/questions.module'; // Importamos el módulo de preguntas
import { Test } from '../tests/test.entity';
import { Area } from 'src/areas/area.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserTestResponse, UserTestResult, Test, Area]),
    QuestionsModule, // Importamos QuestionsModule aquí para que QuestionRepository esté disponible
  ],
  controllers: [UserTestResultsController],
  providers: [UserTestResultsService],
})
export class UserTestResultsModule {}

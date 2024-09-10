/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm'; // Importamos Connection para manejar transacciones
import { UserTestResponse } from '../user-test-responses/user-test-response.entity';
import { UserTestResult } from '../user-test-results/user-test-result.entity';
import { Question } from '../questions/question.entity';
import { Test } from '../tests/test.entity';
import { Area } from 'src/areas/area.entity';

@Injectable()
export class UserTestResultsService {
  constructor(
    @InjectRepository(UserTestResponse)
    private readonly userTestResponseRepository: Repository<UserTestResponse>,
    @InjectRepository(UserTestResult)
    private readonly userTestResultRepository: Repository<UserTestResult>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    private readonly connection: Connection // Para manejar las transacciones

  ) { }

  // CREATE
  async create(resultData: Partial<UserTestResult>): Promise<UserTestResult> {
    const newResult = this.userTestResultRepository.create(resultData);
    return await this.userTestResultRepository.save(newResult);
  }

  // READ all
  async findAll(): Promise<UserTestResult[]> {
    return await this.userTestResultRepository.find({ relations: ['test'] });
  }

  // READ one
  async findOne(id: string): Promise<UserTestResult> {
    return await this.userTestResultRepository.findOne({ where: { result_id: id }, relations: ['test'] });
  }

  // UPDATE
  async update(id: string, updateData: Partial<UserTestResult>): Promise<UserTestResult> {
    await this.userTestResultRepository.update(id, updateData);
    return this.findOne(id);
  }

  // DELETE
  async remove(id: string): Promise<void> {
    await this.userTestResultRepository.delete(id);
  }
  // Procesar las respuestas del usuario y calcular el área de interés usando una transacción
  async submitTestResponses(body: any) {
    const { userId, testId, responses } = body;

    return this.connection.transaction(async (transactionalEntityManager) => {
      try {
        // 1. Obtener el siguiente número de intento
        const attemptNumber = await this.getNextAttemptNumber(userId, testId);

        // 2. Guardar todas las respuestas del usuario dentro de la transacción
        for (const response of responses) {
          const { question_id, answer_id } = response;

          const question = await transactionalEntityManager.findOne(Question, {
            where: { question_id },
            relations: ['test', 'area', 'answers'],
          });

          const answer = question.answers.find(ans => ans.answer_id === answer_id);

          const userTestResponse = new UserTestResponse();
          userTestResponse.user_id = userId;
          userTestResponse.test = await transactionalEntityManager.findOne(Test, { where: { test_id: testId } });
          userTestResponse.question = question;
          userTestResponse.answer = answer;
          userTestResponse.attempt_number = attemptNumber;
          userTestResponse.response_date = new Date();

          // Guardar dentro de la transacción
          await transactionalEntityManager.save(UserTestResponse, userTestResponse);
        }

        // 3. Recuperar las respuestas guardadas dentro de la misma transacción
        const savedResponses = await transactionalEntityManager.find(UserTestResponse, {
          where: { user_id: userId, test: { test_id: testId }, attempt_number: attemptNumber },
          relations: ['question', 'question.area', 'answer'],
        });

        console.log('Respuestas guardadas dentro de la transacción:', savedResponses);

        if (savedResponses.length === 0) {
          throw new Error('No se guardaron las respuestas.');
        }

        // 4. Calcular el área de interés según las respuestas del usuario
        const areaOfInterest = await this.calculateAreaOfInterest(transactionalEntityManager, userId, testId, attemptNumber);

        console.log('Área de interés calculada:', areaOfInterest);

        // 5. Guardar el resultado del test dentro de la transacción
        const userTestResult = new UserTestResult();
        userTestResult.user_id = userId;
        userTestResult.test = await transactionalEntityManager.findOne(Test, { where: { test_id: testId } });
        userTestResult.result_text = areaOfInterest;
        userTestResult.attempt_number = attemptNumber;
        userTestResult.completion_date = new Date();

        await transactionalEntityManager.save(UserTestResult, userTestResult);

        return userTestResult;

      } catch (error) {
        throw new Error(`Error al procesar las respuestas: ${error.message}`);
      }
    });
  }

  // Obtener el siguiente número de intento
  private async getNextAttemptNumber(userId: string, testId: string): Promise<number> {
    const lastResponse = await this.userTestResponseRepository.findOne({
      where: {
        user_id: userId,
        test: { test_id: testId }
      },
      order: { attempt_number: 'DESC' },
    });

    return lastResponse ? lastResponse.attempt_number + 1 : 1;
  }

// Calcular el área de interés sumando los puntajes por área
private async calculateAreaOfInterest(
  transactionalEntityManager: any,
  userId: string,
  testId: string,
  attemptNumber: number
): Promise<string> {
  const responses = await transactionalEntityManager.find(UserTestResponse, {
    where: { user_id: userId, test: { test_id: testId }, attempt_number: attemptNumber },
    relations: ['question', 'question.area', 'answer'],
  });

  console.log('Respuestas obtenidas dentro de la transacción para calcular el área de interés:', responses);

  if (responses.length === 0) {
    throw new Error('No responses found');
  }

  const areaScores = new Map<string, number>();

  // Sumar los puntajes por área con validación adicional
  responses.forEach((response) => {
    const area = response.question.area;
    const score = response.answer.score;

    if (!area || !area.area_name) {
      throw new Error('El área no está definida correctamente en una de las respuestas.');
    }

    const areaName = area.area_name;

    // Inicializar el puntaje del área si no existe aún en el mapa
    if (areaScores.has(areaName)) {
      areaScores.set(areaName, areaScores.get(areaName) + score);
    } else {
      areaScores.set(areaName, score);
    }
  });

  // Verificar si el mapa de áreas tiene algún valor
  if (areaScores.size === 0) {
    throw new Error('No se encontraron puntajes para ninguna área.');
  }

  // Convertir el mapa en un array y aplicar reduce con un valor inicial
  const maxArea = Array.from(areaScores).reduce(
    (a, b) => (a[1] > b[1] ? a : b),
    [null, -Infinity] // Valor inicial que evita errores con reduce
  );

  if (!maxArea || !maxArea[0]) {
    throw new Error('Unable to determine the area of interest.');
  }

  return maxArea[0]; // Devuelve el nombre del área
}


}

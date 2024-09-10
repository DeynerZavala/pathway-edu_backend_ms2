import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestsModule } from './tests/tests.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { UserTestResponsesModule } from './user-test-responses/user-test-responses.module';
import { UserTestResultsModule } from './user-test-results/user-test-results.module';
import { AreasModule } from './areas/areas.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        ssl: {
          rejectUnauthorized: false, // Esta opción desactiva la validación de certificado SSL
        },
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TestsModule,
    QuestionsModule,
    AnswersModule,
    UserTestResponsesModule,
    UserTestResultsModule,
    AreasModule,  // Añadir el módulo para las áreas
  ],
})
export class AppModule {}

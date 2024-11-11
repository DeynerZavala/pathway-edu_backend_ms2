import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TestsModule } from './tests/tests.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { UserTestResponsesModule } from './user-test-responses/user-test-responses.module';
import { UserTestResultsModule } from './user-test-results/user-test-results.module';
import { AreasModule } from './areas/areas.module';
import { TestTemplateModule } from './test-template/test-template.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isSSL = configService.get('DB_SSL') === 'true'; // Variable de entorno para habilitar/deshabilitar SSL
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          ssl: isSSL
            ? {
                rejectUnauthorized: false,
              }
            : false, // Deshabilita SSL si no es necesario
          autoLoadEntities: true,
          synchronize: true, // Desactivar en producción
        };
      },
    }),
    TestsModule,
    QuestionsModule,
    AnswersModule,
    UserTestResponsesModule,
    UserTestResultsModule,
    AreasModule,
    TestTemplateModule,
  ],
})
export class AppModule {}

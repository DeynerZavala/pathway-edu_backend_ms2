import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'ms2', // Puede ser '0.0.0.0' para exponer en toda la red
        port: 3002, // El puerto donde escuchará este microservicio
      },
    },
  );

  // Iniciar el microservicio
  await app.listen();
}

bootstrap();

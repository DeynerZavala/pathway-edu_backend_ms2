import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (origin, callback) => {
      // Permitir cualquier origen, pero asegúrate de que no esté vacío
      if (origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,  // Habilitar credenciales (cookies, tokens)
  });
  await app.listen(3000);
}
bootstrap();

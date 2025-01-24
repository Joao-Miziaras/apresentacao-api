import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:4200', // Permite somente requisições deste domínio
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Métodos permitidos
    credentials: true, // Permite envio de cookies (se necessário)
  });

  await app.listen(3000);
}
bootstrap();

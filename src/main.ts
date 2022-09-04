import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()
const { PORT } = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();

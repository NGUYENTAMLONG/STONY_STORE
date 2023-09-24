import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    exposedHeaders: ['Custom-Header'], // Expose this custom header to JavaScript
    credentials: true, // Allow credentials (e.g., cookies)
    maxAge: 3600, // Cache preflight response for 1 hour
    preflightContinue: false, // Stop processing after preflight check
  });
  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      `💸💸💸 Server is running on PORT: ${process.env.PORT || 3000} 💵💵💵`,
    );
  });
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000, () => {
    console.log(
      `💸💸💸 Server is running on PORT: ${process.env.PORT || 3000} 💵💵💵`,
    );
  });
}
bootstrap();

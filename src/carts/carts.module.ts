import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [CartsController],
  providers: [CartsService, PrismaClient],
  exports: [CartsService],
})
export class CartsModule {}

import { Module } from '@nestjs/common';
import { SizesController } from './sizes.controller';
import { SizesService } from './sizes.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [SizesController],
  providers: [SizesService, PrismaClient],
  exports: [SizesService],
})
export class SizesModule {}

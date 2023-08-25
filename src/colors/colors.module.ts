import { Module } from '@nestjs/common';
import { ColorsController } from './colors.controller';
import { ColorsService } from './colors.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ColorsController],
  providers: [ColorsService, PrismaClient],
  exports: [ColorsService],
})
export class ColorsModule {}

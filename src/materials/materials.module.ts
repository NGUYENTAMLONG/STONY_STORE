import { Module } from '@nestjs/common';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [MaterialsController],
  providers: [MaterialsService, PrismaClient],
  exports: [MaterialsService],
})
export class MaterialsModule {}

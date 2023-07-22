import { Module } from '@nestjs/common';
import { InitializationsController } from './initializations.controller';
import { InitializationsService } from './initializations.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [InitializationsController],
  providers: [InitializationsService, PrismaClient],
})
export class InitializationsModule {}

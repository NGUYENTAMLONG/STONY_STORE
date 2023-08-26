import { Module } from '@nestjs/common';
import { SizesController } from './settings.controller';
import { UserSettingService } from './settings.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [SizesController],
  providers: [UserSettingService, PrismaClient],
  exports: [UserSettingService],
})
export class SizesModule {}

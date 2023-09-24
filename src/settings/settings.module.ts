import { Module } from '@nestjs/common';
import { UserSettingsController } from './settings.controller';
import { UserSettingService } from './settings.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [UserSettingsController],
  providers: [UserSettingService, PrismaClient],
  exports: [UserSettingService],
})
export class UserSettingsModule {}

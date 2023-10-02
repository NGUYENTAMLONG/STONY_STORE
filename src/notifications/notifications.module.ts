import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, PrismaClient],
})
export class NotificationsModule {}

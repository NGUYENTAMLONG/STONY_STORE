import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [EventsController],
  providers: [EventsService, PrismaClient],
  exports: [EventsService],
})
export class EventsModule {}

import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, PrismaClient],
  exports: [ContactsService],
})
export class ContactsModule {}

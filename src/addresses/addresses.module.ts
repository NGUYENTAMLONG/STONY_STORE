import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AddressesController],
  providers: [AddressesService, PrismaClient],
  exports: [AddressesService],
})
export class AddressesModule {}

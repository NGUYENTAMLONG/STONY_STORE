import { Module } from '@nestjs/common';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [VouchersController],
  providers: [VouchersService, PrismaClient],
  exports: [VouchersService],
})
export class VouchersModule {}

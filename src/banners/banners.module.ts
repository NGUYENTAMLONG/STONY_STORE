import { Module } from '@nestjs/common';
import { BannersController } from './banners.controller';
import { BannersService } from './banners.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [BannersController],
  providers: [BannersService, PrismaClient],
  exports: [BannersService],
})
export class BannersModule {}

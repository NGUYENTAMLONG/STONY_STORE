import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService,PrismaClient],
})
export class ReviewsModule {}

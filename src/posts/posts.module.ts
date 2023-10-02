import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PostsController],
  providers: [PostsService,PrismaClient]
})
export class PostsModule {}

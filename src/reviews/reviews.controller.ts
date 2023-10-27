import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { imageFileFilter } from 'src/validators/validation-file';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  // Post Category
  @Post()
  @Roles(UserType.STAFF)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './src/public/images/categories',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async createCategory(
    @Request() req,
    @Body() payload,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.reviewsService.createOneReview(payload, thumbnail);
  }
}

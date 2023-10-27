import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
  Request,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Put,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/validators/validation-file';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { CreatePostCategoryDto, CreatePostDto, UpdatePostCategoryDto, UpdatePostDto } from './dtos/post.dtos';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public async getPostList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const posts = await this.postsService.getList(page, limit);
    return {
      page,
      limit,
      data: posts,
    };
  }

  @Get()
  public async getPostCategories() {
    return this.postsService.getPostCategory();
  }

  @Get('me')
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async getMyOrders(
    @Request() req,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const orders = await this.postsService.getMyPostList(req.user, page, limit);
    return {
      page,
      limit,
      data: orders,
    };
  }

  @Post()
  @Roles(UserType.STAFF)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      // Enable file size limits
      limits: {
        fileSize: 5000000, //(5MB) //+process.env.MAX_FILE_SIZE,
      },
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './src/public/images/thumbnails',
        filename: editFileName,
      }),
    }),
  )
  public async createPost(
    @Request() req,
    @Body() payload: CreatePostDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    return this.postsService.createOnePost(req.user, payload, thumbnail);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      // Enable file size limits
      limits: {
        fileSize: 5000000, //+process.env.MAX_FILE_SIZE,
      },
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './src/public/images/thumbnails',
        filename: editFileName,
      }),
    }),
  )
  public async updatePost(
    @Param('id', new ParseIntPipe({ optional: true })) postId: number,
    @Body() payload: UpdatePostDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.postsService.updateOnePost(postId, payload, thumbnail);
  }

  @Delete('/soft-delete/:id')
  public async softDeletePost(@Param('id') id: number) {
    const result = await this.postsService.softDeleteOne(id);
    return result;
  }

  @Delete('/force-delete/:id')
  public async forceDeletePost(@Param('id') id: number) {
    const result = await this.postsService.forceDeleteOne(id);
    return result;
  }

  @Patch('/restore/:id')
  public async restorePost(
    @Param('id', new ParseIntPipe({ optional: true })) postId: number,
  ) {
    return this.postsService.restoreOne(postId);
  }

  // Post Category
  @Post()
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
    @Body() payload: CreatePostCategoryDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.postsService.createOneCategory(payload, thumbnail);
  }

  @Patch('/restore/:id')
  public async restoreCategory(
    // @Param('id') categoryId: number,
    @Param('id', new ParseIntPipe({ optional: true })) categoryId: number,
  ) {
    return this.postsService.restoreOneCategory(categoryId);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './src/public/images/categories',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async updateCategory(
    // @Param('id') categoryId: number,
    @Param('id', new ParseIntPipe({ optional: true })) categoryId: number,
    @Body() payload: UpdatePostCategoryDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.postsService.updateOneCategory(
      categoryId,
      payload,
      thumbnail,
    );
  }
}

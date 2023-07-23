import {
  Post,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  Controller,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { imageFileFilter } from 'src/validators/validation-file';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateCategoryDto,
} from './dtos/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  public async getCategoryList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const categories = await this.categoriesService.getList(page, limit);
    return {
      page,
      limit,
      data: categories,
    };
  }

  @Get('sub-category')
  public async getSubCategoryList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const subCategories = await this.categoriesService.getSubList(page, limit);
    return {
      page,
      limit,
      data: subCategories,
    };
  }

  @Get(':id')
  public async findCategory(
    @Param('id', new ParseIntPipe({ optional: true })) categoryId: number,
  ) {
    return this.categoriesService.getOneById(categoryId);
  }

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
    @Body() payload: CreateCategoryDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.categoriesService.createOneCategory(payload, thumbnail);
  }
  @Post('/sub-category')
  @UseInterceptors(
    FileInterceptor('thumbnail', {
      storage: diskStorage({
        destination: './src/public/images/categories',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async createSubCategory(
    @Body() payload: CreateSubCategoryDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.categoriesService.createOneSubCategory(payload, thumbnail);
  }

  @Patch('/restore/:id')
  public async restoreCategory(
    // @Param('id') categoryId: number,
    @Param('id', new ParseIntPipe({ optional: true })) categoryId: number,
  ) {
    return this.categoriesService.restoreOneCategory(categoryId);
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
    @Body() payload: UpdateCategoryDto,
    @UploadedFile() thumbnail?: Express.Multer.File,
  ) {
    return this.categoriesService.updateOneCategory(
      categoryId,
      payload,
      thumbnail,
    );
  }

  @Delete('/soft-delete/:id')
  public async softDeleteCategory(
    @Param('id', new ParseIntPipe({ optional: true })) categoryId: number,
  ) {
    return this.categoriesService.softDeleteOneById(categoryId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.categoriesService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.categoriesService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteCategory(
    @Param('id', new ParseIntPipe({ optional: true })) categoryId: number,
    @Body() payload: IsDeleteImageDto,
  ) {
    return this.categoriesService.forceDeleteOneById(categoryId, payload);
  }
}

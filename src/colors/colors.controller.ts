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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/validators/validation-file';
import {
  CreateColorDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateColorDto,
} from './dtos/colors.dto';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { Controller } from '@nestjs/common';
import { ColorsService } from './colors.service';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  public async getColorList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const colors = await this.colorsService.getList(page, limit);
    return {
      page,
      limit,
      data: colors,
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('color', {
      storage: diskStorage({
        destination: './src/public/images/colors',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async createColor(
    @Body() payload: CreateColorDto,
    @UploadedFile() color: Express.Multer.File,
  ) {
    return this.colorsService.createOneColor(payload, color);
  }

  @Patch('/restore/:id')
  public async restoreColor(
    // @Param('id') bannerId: number,
    @Param('id', new ParseIntPipe({ optional: true })) colorId: number,
  ) {
    return this.colorsService.restoreOneColor(colorId);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('banner', {
      storage: diskStorage({
        destination: './src/public/images/banners',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async updateColor(
    // @Param('id') bannerId: number,
    @Param('id', new ParseIntPipe({ optional: true })) colorId: number,
    @Body() payload: UpdateColorDto,
    @UploadedFile() color?: Express.Multer.File,
  ) {
    return this.colorsService.updateOneColor(colorId, payload, color);
  }

  @Get(':id')
  public async findBanner(
    @Param('id', new ParseIntPipe({ optional: true })) colorId: number,
  ) {
    return this.colorsService.getOneById(colorId);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteColor(
    @Param('id', new ParseIntPipe({ optional: true })) colorId: number,
  ) {
    return this.colorsService.softDeleteOneById(colorId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.colorsService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.colorsService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteColor(
    @Param('id', new ParseIntPipe({ optional: true })) colorId: number,
    @Body() payload: IsDeleteImageDto,
  ) {
    return this.colorsService.forceDeleteOneById(colorId, payload);
  }
}

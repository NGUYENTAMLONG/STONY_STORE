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
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/validators/validation-file';
import {
  CreateSizeDto,
  DeleteMultipleDto,
  RestoreMultipleDto,
  UpdateSizeDto,
} from './dtos/sizes.dto';
import { SizesService } from './sizes.service';
@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}

  @Get()
  public async getSizeList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const sizes = await this.sizesService.getList(page, limit);
    return {
      page,
      limit,
      data: sizes,
    };
  }

  @Post()
  public async createSize(@Body() payload: CreateSizeDto) {
    return this.sizesService.createOneSize(payload);
  }

  @Patch('/restore/:id')
  public async restoreSize(
    @Param('id', new ParseIntPipe({ optional: true })) sizeId: number,
  ) {
    return this.sizesService.restoreOneSize(sizeId);
  }

  @Patch(':id')
  public async updateSize(
    @Param('id', new ParseIntPipe({ optional: true })) sizeId: number,
    @Body() payload: UpdateSizeDto,
  ) {
    return this.sizesService.updateOneSize(sizeId, payload);
  }

  @Get(':id')
  public async findSize(
    @Param('id', new ParseIntPipe({ optional: true })) sizeId: number,
  ) {
    return this.sizesService.getOneById(sizeId);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteSize(
    @Param('id', new ParseIntPipe({ optional: true })) sizeId: number,
  ) {
    return this.sizesService.softDeleteOneById(sizeId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.sizesService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.sizesService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteSize(
    @Param('id', new ParseIntPipe({ optional: true })) sizeId: number,
  ) {
    return this.sizesService.forceDeleteOneById(sizeId);
  }
}

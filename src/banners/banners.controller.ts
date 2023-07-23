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
import { BannersService } from './banners.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/validators/validation-file';
import {
  CreateBannerDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateBannerDto,
} from './dtos/banners.dto';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  public async getBannerList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const banners = await this.bannersService.getList(page, limit);
    return {
      page,
      limit,
      data: banners,
    };
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('banner', {
      storage: diskStorage({
        destination: './src/public/images/banners',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  public async createBanner(
    @Body() payload: CreateBannerDto,
    @UploadedFile() banner: Express.Multer.File,
  ) {
    return this.bannersService.createOneBanner(payload, banner);
  }

  @Patch('/restore/:id')
  public async restoreBanner(
    // @Param('id') bannerId: number,
    @Param('id', new ParseIntPipe({ optional: true })) bannerId: number,
  ) {
    return this.bannersService.restoreOneBanner(bannerId);
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
  public async updateBanner(
    // @Param('id') bannerId: number,
    @Param('id', new ParseIntPipe({ optional: true })) bannerId: number,
    @Body() payload: UpdateBannerDto,
    @UploadedFile() banner?: Express.Multer.File,
  ) {
    return this.bannersService.updateOneBanner(bannerId, payload, banner);
  }

  @Get(':id')
  public async findBanner(
    @Param('id', new ParseIntPipe({ optional: true })) bannerId: number,
  ) {
    return this.bannersService.getOneById(bannerId);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteBanner(
    @Param('id', new ParseIntPipe({ optional: true })) bannerId: number,
  ) {
    return this.bannersService.softDeleteOneById(bannerId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.bannersService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.bannersService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteBanner(
    @Param('id', new ParseIntPipe({ optional: true })) bannerId: number,
    @Body() payload: IsDeleteImageDto,
  ) {
    return this.bannersService.forceDeleteOneById(bannerId, payload);
  }
}

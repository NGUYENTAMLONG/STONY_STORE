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
import { CreateBannerDto, UpdateBannerDto } from './dtos/banners.dto';
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
}

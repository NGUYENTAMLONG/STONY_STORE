import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Banner } from '@prisma/client';
import { CreateBannerDto, UploadFileDto } from './dtos/banners.dto';
import { EXCEPTION_BANNER } from './contants/banner.constant';

@Injectable()
export class BannersService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Banner[]> {
    try {
      const offset = (page - 1) * limit;
      const banners = await this.prisma.banner.findMany({
        skip: offset,
        take: limit,
      });
      return banners;
    } catch (error) {
      console.log({ bannerListError: error });
      return error;
    }
  }

  public async createOneBanner(
    payload: CreateBannerDto,
    banner: Express.Multer.File,
  ): Promise<Banner> {
    try {
      const { title, desc, metadata } = payload;
      const {
        fieldname,
        mimetype,
        originalname,
        size,
        buffer,
        filename,
        destination,
        path,
        stream,
      } = banner;
      const banners = await this.prisma.banner.create({
        data: {
          title,
          desc,
          url: `/images/banners/${filename}`,
          metadata: metadata,
        },
      });
      return banners;
    } catch (error) {
      console.log({ createBannerError: error });
      return error;
    }
  }
  public async updateOneBanner(
    bannerId: number,
    payload: CreateBannerDto,
    banner?: Express.Multer.File,
  ): Promise<Banner> {
    try {
      const { title, desc, metadata } = payload;
      const foundBanner = await this.prisma.banner.findFirst({
        where: {
          id: bannerId,
        },
      });
      if (!foundBanner) {
        throw new BadRequestException(EXCEPTION_BANNER.BANNER_NOT_FOUND);
      }
      //   const {
      //     fieldname,
      //     mimetype,
      //     originalname,
      //     size,
      //     buffer,
      //     filename,
      //     destination,
      //     path,
      //     stream,
      //   } = banner;
      //   const banners = await this.prisma.banner.create({
      //     data: {
      //       title,
      //       desc,
      //       url: `/images/banners/${filename}`,
      //       metadata: metadata,
      //     },
      //   });
      //   return banners;
    } catch (error) {
      console.log({ createBannerError: error });
      return error;
    }
  }
}

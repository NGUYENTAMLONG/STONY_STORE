import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Banner } from '@prisma/client';
import {
  CreateBannerDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateBannerDto,
  UploadFileDto,
} from './dtos/banners.dto';
import { EXCEPTION_BANNER } from './contants/banner.constant';
import * as fs from 'fs';

@Injectable()
export class BannersService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Banner[]> {
    try {
      const offset = (page - 1) * limit;
      const banners = await this.prisma.banner.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
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
      const { title, description, metadata } = payload;
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
      const createBanner = await this.prisma.banner.create({
        data: {
          title,
          description,
          url: `/images/banners/${filename}`,
          metadata: metadata,
        },
      });
      return createBanner;
    } catch (error) {
      console.log({ createBannerError: error });
      return error;
    }
  }

  public async updateOneBanner(
    bannerId: number,
    payload: UpdateBannerDto,
    banner?: Express.Multer.File,
  ): Promise<Banner> {
    try {
      const { title, description, metadata } = payload;
      const foundBanner = await this.prisma.banner.findFirst({
        where: {
          id: bannerId,
        },
      });
      if (!foundBanner) {
        throw new BadRequestException(EXCEPTION_BANNER.BANNER_NOT_FOUND);
      }
      let data = {
        title,
        description,
        metadata: metadata,
      };
      if (banner?.filename) {
        data['url'] = `/images/banners/${banner.filename}`;
      }
      const updateBanner = await this.prisma.banner.update({
        where: {
          id: bannerId,
        },
        data,
      });
      return updateBanner;
    } catch (error) {
      console.log({ updateBannerError: error });
      return error;
    }
  }

  public async getOneById(bannerId: number): Promise<Banner> {
    try {
      const foundBannerById = await this.prisma.banner.findFirst({
        where: {
          id: bannerId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundBannerById;
    } catch (error) {
      console.log({ foundBannerByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(bannerId: number): Promise<Banner> {
    try {
      const foundBanner = await this.prisma.banner.findFirst({
        where: {
          id: bannerId,
        },
      });
      if (!foundBanner) {
        throw new BadRequestException(EXCEPTION_BANNER.BANNER_NOT_FOUND);
      }

      const softDeleteBannerById = await this.prisma.banner.update({
        where: {
          id: bannerId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteBannerById;
    } catch (error) {
      console.log({ softDeleteBannerByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleBanners = await this.prisma.banner.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleBanners;
    } catch (error) {
      console.log({ softDeleteMultipleBannerByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleBanners = await this.prisma.banner.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleBanners;
    } catch (error) {
      console.log({ restoreMultipleBannerByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneBanner(bannerId: number): Promise<Banner> {
    try {
      const foundBanner = await this.prisma.banner.findFirst({
        where: {
          id: bannerId,
          deletedFlg: true,
        },
      });
      if (!foundBanner) {
        throw new BadRequestException(EXCEPTION_BANNER.BANNER_NOT_FOUND);
      }

      const restoreBannerById = await this.prisma.banner.update({
        where: {
          id: bannerId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreBannerById;
    } catch (error) {
      console.log({ restoreBannerByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(
    bannerId: number,
    payload: IsDeleteImageDto,
  ): Promise<Banner> {
    try {
      const foundBanner = await this.prisma.banner.findFirst({
        where: {
          id: bannerId,
        },
      });
      if (!foundBanner) {
        throw new BadRequestException(EXCEPTION_BANNER.BANNER_NOT_FOUND);
      }

      if (payload?.isDeleteImage) {
        await fs.promises.unlink(`./src/public/${foundBanner.url}`);
      }

      const forceDeleteBannerById = await this.prisma.banner.delete({
        where: {
          id: bannerId,
        },
      });
      return forceDeleteBannerById;
    } catch (error) {
      console.log({ forceDeleteBannerByIdError: error });
      return error;
    }
  }

  /// *****
  public async forceDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleBanners = await this.prisma.banner.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleBanners;
    } catch (error) {
      console.log({ softDeleteMultipleBannerByIdArrayError: error });
      return error;
    }
  }
}

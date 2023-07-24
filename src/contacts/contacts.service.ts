import { BadRequestException, Injectable } from '@nestjs/common';
import { Contact, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import {
  CreateContactDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
} from './dtos/contacts.dto';
import { EXCEPTION_CONTACT } from './contants/contact.constant';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Contact[]> {
    try {
      const offset = (page - 1) * limit;
      const banners = await this.prisma.contact.findMany({
        where: {
          deletedAt: null,
          //   deletedFlg: false,
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

  public async createOneContact(
    payload: CreateContactDto,
    banner: Express.Multer.File,
  ): Promise<Contact> {
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
      const createBanner = await this.prisma.contact.create({
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

  public async updateOneContact(
    bannerId: number,
    payload: CreateContactDto,
    banner?: Express.Multer.File,
  ): Promise<Contact> {
    try {
      const { title, description, metadata } = payload;
      const foundBanner = await this.prisma.contact.findFirst({
        where: {
          id: bannerId,
        },
      });
      if (!foundBanner) {
        throw new BadRequestException(EXCEPTION_CONTACT.CONTACT_NOT_FOUND);
      }
      let data = {
        title,
        description,
        metadata: metadata,
      };
      if (banner?.filename) {
        data['url'] = `/images/banners/${banner.filename}`;
      }
      const updateBanner = await this.prisma.contact.update({
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

  public async getOneById(bannerId: number): Promise<Contact> {
    try {
      const foundBannerById = await this.prisma.contact.findFirst({
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

  public async softDeleteOneById(bannerId: number): Promise<Contact> {
    try {
      const foundBanner = await this.prisma.contact.findFirst({
        where: {
          id: bannerId,
        },
      });
      if (!foundBanner) {
        throw new BadRequestException(EXCEPTION_CONTACT.CONTACT_NOT_FOUND);
      }

      const softDeleteBannerById = await this.prisma.contact.update({
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
      const softDeleteMultipleBanners = await this.prisma.contact.updateMany({
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
      const restoreMultipleBanners = await this.prisma.contact.updateMany({
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

  public async restoreOneContact(bannerId: number): Promise<Contact> {
    try {
      const foundBanner = await this.prisma.contact.findFirst({
        where: {
          id: bannerId,
          deletedFlg: true,
        },
      });
      if (!foundBanner) {
        throw new BadRequestException(EXCEPTION_CONTACT.CONTACT_NOT_FOUND);
      }

      const restoreBannerById = await this.prisma.contact.update({
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
  ): Promise<Contact> {
    try {
      const foundBanner = await this.prisma.contact.findFirst({
        where: {
          id: bannerId,
        },
      });
      if (!foundBanner) {
        throw new BadRequestException(EXCEPTION_CONTACT.CONTACT_NOT_FOUND);
      }

      //   if (payload?.isDeleteImage) {
      //     await fs.promises.unlink(`./src/public/${foundBanner.url}`);
      //   }

      const forceDeleteBannerById = await this.prisma.contact.delete({
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
      const softDeleteMultipleBanners = await this.prisma.contact.updateMany({
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

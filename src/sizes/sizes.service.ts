import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, Size } from '@prisma/client';
import {
  CreateSizeDto,
  DeleteMultipleDto,
  RestoreMultipleDto,
  UpdateSizeDto,
} from './dtos/sizes.dto';
import { EXCEPTION_SIZE } from './contants/size.constant';

@Injectable()
export class SizesService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Size[]> {
    try {
      const offset = (page - 1) * limit;
      const sizes = await this.prisma.size.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return sizes;
    } catch (error) {
      console.log({ sizeListError: error });
      return error;
    }
  }

  public async createOneSize(payload: CreateSizeDto): Promise<Size> {
    try {
      const { name, description, metadata } = payload;
      const createSize = await this.prisma.size.create({
        data: {
          name,
          description,
          metadata: metadata,
        },
      });
      return createSize;
    } catch (error) {
      console.log({ createSizeError: error });
      return error;
    }
  }

  public async updateOneSize(
    sizeId: number,
    payload: UpdateSizeDto,
  ): Promise<Size> {
    try {
      const { name, description, metadata } = payload;
      const foundSize = await this.prisma.size.findFirst({
        where: {
          id: sizeId,
        },
      });
      if (!foundSize) {
        throw new BadRequestException(EXCEPTION_SIZE.SIZE_NOT_FOUND);
      }
      let data = {
        name,
        description,
        metadata: metadata,
      };
      const updateSize = await this.prisma.size.update({
        where: {
          id: sizeId,
        },
        data,
      });
      return updateSize;
    } catch (error) {
      console.log({ updateSizeError: error });
      return error;
    }
  }

  public async getOneById(sizeId: number): Promise<Size> {
    try {
      const foundSizeById = await this.prisma.size.findFirst({
        where: {
          id: sizeId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundSizeById;
    } catch (error) {
      console.log({ foundSizeByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(sizeId: number): Promise<Size> {
    try {
      const foundSize = await this.prisma.size.findFirst({
        where: {
          id: sizeId,
        },
      });
      if (!foundSize) {
        throw new BadRequestException(EXCEPTION_SIZE.SIZE_NOT_FOUND);
      }

      const softDeleteSizeById = await this.prisma.size.update({
        where: {
          id: sizeId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteSizeById;
    } catch (error) {
      console.log({ softDeleteSizeByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleSizes = await this.prisma.size.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleSizes;
    } catch (error) {
      console.log({ softDeleteMultipleSizeByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleSizes = await this.prisma.size.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleSizes;
    } catch (error) {
      console.log({ restoreMultipleSizeByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneSize(sizeId: number): Promise<Size> {
    try {
      const foundSize = await this.prisma.size.findFirst({
        where: {
          id: sizeId,
          deletedFlg: true,
        },
      });
      if (!foundSize) {
        throw new BadRequestException(EXCEPTION_SIZE.SIZE_NOT_FOUND);
      }

      const restoreSizeById = await this.prisma.size.update({
        where: {
          id: sizeId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreSizeById;
    } catch (error) {
      console.log({ restoreSizeByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(sizeId: number): Promise<Size> {
    try {
      const foundSize = await this.prisma.size.findFirst({
        where: {
          id: sizeId,
        },
      });
      if (!foundSize) {
        throw new BadRequestException(EXCEPTION_SIZE.SIZE_NOT_FOUND);
      }

      const forceDeleteSizeById = await this.prisma.size.delete({
        where: {
          id: sizeId,
        },
      });
      return forceDeleteSizeById;
    } catch (error) {
      console.log({ forceDeleteSizeByIdError: error });
      return error;
    }
  }

  /// *****
  public async forceDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleSizes = await this.prisma.size.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleSizes;
    } catch (error) {
      console.log({ softDeleteMultipleSizeByIdArrayError: error });
      return error;
    }
  }
}

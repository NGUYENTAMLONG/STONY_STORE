import { BadRequestException, Injectable } from '@nestjs/common';
import { Color, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import {
  CreateColorDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateColorDto,
} from './dtos/colors.dto';
import { EXCEPTION_COLOR } from './constants/color.constant';
@Injectable()
export class ColorsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Color[]> {
    try {
      const offset = (page - 1) * limit;
      const colors = await this.prisma.color.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return colors;
    } catch (error) {
      console.log({ colorListError: error });
      return error;
    }
  }

  public async createOneColor(
    payload: CreateColorDto,
    color: Express.Multer.File,
  ): Promise<Color> {
    try {
      const { name, nameEN, description, metadata } = payload;
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
      } = color;
      const createColor = await this.prisma.color.create({
        data: {
          name,
          nameEN,
          description,
          image: `/images/colors/${filename}`,
          metadata: metadata,
        },
      });
      return createColor;
    } catch (error) {
      console.log({ createColorError: error });
      return error;
    }
  }

  public async updateOneColor(
    colorId: number,
    payload: UpdateColorDto,
    color?: Express.Multer.File,
  ): Promise<Color> {
    try {
      const { name, nameEN, description, metadata } = payload;
      const foundColor = await this.prisma.color.findFirst({
        where: {
          id: colorId,
        },
      });
      if (!foundColor) {
        throw new BadRequestException(EXCEPTION_COLOR.COLOR_NOT_FOUND);
      }
      let data = {
        name,
        nameEN,
        description,
        metadata: metadata,
      };
      if (color?.filename) {
        data['image'] = `/images/colors/${color.filename}`;
      }
      const updateColor = await this.prisma.color.update({
        where: {
          id: colorId,
        },
        data,
      });
      return updateColor;
    } catch (error) {
      console.log({ updateColorError: error });
      return error;
    }
  }

  public async getOneById(colorId: number): Promise<Color> {
    try {
      const foundColorById = await this.prisma.color.findFirst({
        where: {
          id: colorId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundColorById;
    } catch (error) {
      console.log({ foundColorByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(colorId: number): Promise<Color> {
    try {
      const foundColor = await this.prisma.color.findFirst({
        where: {
          id: colorId,
        },
      });
      if (!foundColor) {
        throw new BadRequestException(EXCEPTION_COLOR.COLOR_NOT_FOUND);
      }

      const softDeleteColorById = await this.prisma.color.update({
        where: {
          id: colorId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteColorById;
    } catch (error) {
      console.log({ softDeleteColorByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleColors = await this.prisma.color.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleColors;
    } catch (error) {
      console.log({ softDeleteMultipleColorByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleColors = await this.prisma.color.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleColors;
    } catch (error) {
      console.log({ restoreMultipleColorByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneColor(colorId: number): Promise<Color> {
    try {
      const foundColor = await this.prisma.color.findFirst({
        where: {
          id: colorId,
          deletedFlg: true,
        },
      });
      if (!foundColor) {
        throw new BadRequestException(EXCEPTION_COLOR.COLOR_NOT_FOUND);
      }

      const restoreColorById = await this.prisma.color.update({
        where: {
          id: colorId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreColorById;
    } catch (error) {
      console.log({ restoreColorByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(
    colorId: number,
    payload: IsDeleteImageDto,
  ): Promise<Color> {
    try {
      const foundColor = await this.prisma.color.findFirst({
        where: {
          id: colorId,
        },
      });
      if (!foundColor) {
        throw new BadRequestException(EXCEPTION_COLOR.COLOR_NOT_FOUND);
      }

      if (payload?.isDeleteImage) {
        await fs.promises.unlink(`./src/public/${foundColor.image}`);
      }

      const forceDeleteColorById = await this.prisma.color.delete({
        where: {
          id: colorId,
        },
      });
      return forceDeleteColorById;
    } catch (error) {
      console.log({ forceDeleteColorByIdError: error });
      return error;
    }
  }

  /// *****
  public async forceDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleColors = await this.prisma.color.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleColors;
    } catch (error) {
      console.log({ softDeleteMultipleColorByIdArrayError: error });
      return error;
    }
  }
}

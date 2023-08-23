import { BadRequestException, Injectable } from '@nestjs/common';
import { Material, PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import {
  CreateMaterialDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateMaterialDto,
} from './dtos/materials.dto';
import { EXCEPTION_MATERIAL } from './constants/material.constant';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Material[]> {
    try {
      const offset = (page - 1) * limit;
      const materials = await this.prisma.material.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return materials;
    } catch (error) {
      console.log({ materialListError: error });
      return error;
    }
  }

  public async createOneMaterial(
    payload: CreateMaterialDto,
    material: Express.Multer.File,
  ): Promise<Material> {
    try {
      const { name, description, metadata } = payload;
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
      } = material;
      const createMaterial = await this.prisma.material.create({
        data: {
          name,
          description,
          image: `/images/materials/${filename}`,
          metadata: metadata,
        },
      });
      return createMaterial;
    } catch (error) {
      console.log({ createMaterialError: error });
      return error;
    }
  }

  public async updateOneMaterial(
    materialId: number,
    payload: UpdateMaterialDto,
    material?: Express.Multer.File,
  ): Promise<Material> {
    try {
      const { name, description, metadata } = payload;
      const foundMaterial = await this.prisma.material.findFirst({
        where: {
          id: materialId,
        },
      });
      if (!foundMaterial) {
        throw new BadRequestException(EXCEPTION_MATERIAL.MATERIAL_NOT_FOUND);
      }
      let data = {
        name,
        description,
        metadata: metadata,
      };
      if (material?.filename) {
        data['image'] = `/images/materials/${material.filename}`;
      }
      const updateMaterial = await this.prisma.material.update({
        where: {
          id: materialId,
        },
        data,
      });
      return updateMaterial;
    } catch (error) {
      console.log({ updateMaterialError: error });
      return error;
    }
  }

  public async getOneById(materialId: number): Promise<Material> {
    try {
      const foundMaterialById = await this.prisma.material.findFirst({
        where: {
          id: materialId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundMaterialById;
    } catch (error) {
      console.log({ foundMaterialByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(materialId: number): Promise<Material> {
    try {
      const foundMaterial = await this.prisma.material.findFirst({
        where: {
          id: materialId,
        },
      });
      if (!foundMaterial) {
        throw new BadRequestException(EXCEPTION_MATERIAL.MATERIAL_NOT_FOUND);
      }

      const softDeleteMaterialById = await this.prisma.material.update({
        where: {
          id: materialId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteMaterialById;
    } catch (error) {
      console.log({ softDeleteMaterialByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleMaterials = await this.prisma.material.updateMany(
        {
          where: { id: { in: ids } },
          data: {
            deletedFlg: true,
            deletedAt: new Date(),
          },
        },
      );

      return softDeleteMultipleMaterials;
    } catch (error) {
      console.log({ softDeleteMultipleMaterialByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleMaterials = await this.prisma.material.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleMaterials;
    } catch (error) {
      console.log({ restoreMultipleMaterialByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneMaterial(materialId: number): Promise<Material> {
    try {
      const foundMaterial = await this.prisma.material.findFirst({
        where: {
          id: materialId,
          deletedFlg: true,
        },
      });
      if (!foundMaterial) {
        throw new BadRequestException(EXCEPTION_MATERIAL.MATERIAL_NOT_FOUND);
      }

      const restoreMaterialById = await this.prisma.material.update({
        where: {
          id: materialId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreMaterialById;
    } catch (error) {
      console.log({ restoreMaterialByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(
    materialId: number,
    payload: IsDeleteImageDto,
  ): Promise<Material> {
    try {
      const foundMaterial = await this.prisma.material.findFirst({
        where: {
          id: materialId,
        },
      });
      if (!foundMaterial) {
        throw new BadRequestException(EXCEPTION_MATERIAL.MATERIAL_NOT_FOUND);
      }

      if (payload?.isDeleteImage) {
        await fs.promises.unlink(`./src/public/${foundMaterial.image}`);
      }

      const forceDeleteMaterialById = await this.prisma.material.delete({
        where: {
          id: materialId,
        },
      });
      return forceDeleteMaterialById;
    } catch (error) {
      console.log({ forceDeleteMaterialByIdError: error });
      return error;
    }
  }

  /// *****
  public async forceDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleMaterials = await this.prisma.material.updateMany(
        {
          where: { id: { in: ids } },
          data: {
            deletedFlg: true,
            deletedAt: new Date(),
          },
        },
      );

      return softDeleteMultipleMaterials;
    } catch (error) {
      console.log({ softDeleteMultipleMaterialByIdArrayError: error });
      return error;
    }
  }
}

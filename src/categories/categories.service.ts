import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category, PrismaClient, SubCategory } from '@prisma/client';
import {
  CreateCategoryDto,
  CreateSubCategoryDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
} from './dtos/categories.dto';
import { EXCEPTION_CATEGORY } from './contants/category.constant';
import * as fs from 'fs';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Category[]> {
    try {
      const offset = (page - 1) * limit;
      const categories = await this.prisma.category.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
        include: {
          SubCategory: true,
        },
      });

      //  return categories.map((category) => ({
      //    category,
      //    subcategories: category.subcategories,
      //  }));
      return categories;
    } catch (error) {
      console.log({ categoryListError: error });
      return error;
    }
  }
  public async getSubList(page: number, limit: number): Promise<SubCategory[]> {
    try {
      const offset = (page - 1) * limit;
      const subCategories = await this.prisma.subCategory.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
        include: {
          category: true,
        },
      });
      return subCategories;
    } catch (error) {
      console.log({ subCategoryListError: error });
      return error;
    }
  }

  public async createOneCategory(
    payload: CreateCategoryDto,
    thumbnail?: Express.Multer.File,
  ): Promise<Category> {
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
      } = thumbnail;
      const createCategory = await this.prisma.category.create({
        data: {
          name,
          nameEN,
          description,
          thumbnail: `/images/categories/${filename}`,
          metadata: metadata,
        },
      });
      return createCategory;
    } catch (error) {
      console.log({ createCategoryError: error });
      return error;
    }
  }
  public async createOneSubCategory(
    payload: CreateSubCategoryDto,
    thumbnail?: Express.Multer.File,
  ): Promise<Category> {
    try {
      const { parentCategory, name, nameEN, description, metadata } = payload;
      const { filename } = thumbnail;
      const foundParentCategory = await this.prisma.category.findFirst({
        where: {
          id: Number(parentCategory),
        },
      });
      if (!foundParentCategory) {
        throw new NotFoundException(EXCEPTION_CATEGORY.CATEGORY_NOT_FOUND);
      }

      const createCategory = await this.prisma.subCategory.create({
        data: {
          name,
          categoryId: Number(parentCategory),
          nameEN,
          description,
          thumbnail: `/images/categories/${filename}`,
          metadata: metadata,
        },
      });

      await this.prisma.category.update({
        where: {
          id: Number(parentCategory),
        },
        data: { subCategory: { connect: { id: createCategory.id } } },
      });

      return createCategory;
    } catch (error) {
      console.log({ createCategoryError: error });
      return error;
    }
  }
  public async updateOneCategory(
    categoryId: number,
    payload: CreateCategoryDto,
    thumbnail?: Express.Multer.File,
  ): Promise<Category> {
    try {
      const { name, nameEN, description, metadata } = payload;
      const foundCategory = await this.prisma.category.findFirst({
        where: {
          id: categoryId,
        },
      });
      if (!foundCategory) {
        throw new BadRequestException(EXCEPTION_CATEGORY.CATEGORY_NOT_FOUND);
      }
      let data = {
        name,
        nameEN,
        description,
        metadata: metadata,
      };
      if (thumbnail?.filename) {
        data['thumbnail'] = `/images/categories/${thumbnail.filename}`;
      }
      const updateCategory = await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data,
      });
      return updateCategory;
    } catch (error) {
      console.log({ updateCategoryError: error });
      return error;
    }
  }

  public async getOneById(categoryId: number): Promise<Category> {
    try {
      const foundCategoryById = await this.prisma.category.findFirst({
        where: {
          id: categoryId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundCategoryById;
    } catch (error) {
      console.log({ foundCategoryByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(categoryId: number): Promise<Category> {
    try {
      const foundCategory = await this.prisma.category.findFirst({
        where: {
          id: categoryId,
        },
      });
      if (!foundCategory) {
        throw new BadRequestException(EXCEPTION_CATEGORY.CATEGORY_NOT_FOUND);
      }

      const softDeleteCategoryById = await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteCategoryById;
    } catch (error) {
      console.log({ softDeleteCategoryByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleCategories =
        await this.prisma.category.updateMany({
          where: { id: { in: ids } },
          data: {
            deletedFlg: true,
            deletedAt: new Date(),
          },
        });

      return softDeleteMultipleCategories;
    } catch (error) {
      console.log({ softDeleteMultipleCategoriesByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleCategories = await this.prisma.category.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleCategories;
    } catch (error) {
      console.log({ restoreMultipleCategoryByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneCategory(categoryId: number): Promise<Category> {
    try {
      const foundCategory = await this.prisma.category.findFirst({
        where: {
          id: categoryId,
          deletedFlg: true,
        },
      });
      if (!foundCategory) {
        throw new BadRequestException(EXCEPTION_CATEGORY.CATEGORY_NOT_FOUND);
      }

      const restoreCategoryById = await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreCategoryById;
    } catch (error) {
      console.log({ restoreCategoryByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(
    categoryId: number,
    payload: IsDeleteImageDto,
  ): Promise<Category> {
    try {
      const foundCategory = await this.prisma.category.findFirst({
        where: {
          id: categoryId,
        },
      });
      if (!foundCategory) {
        throw new BadRequestException(EXCEPTION_CATEGORY.CATEGORY_NOT_FOUND);
      }

      if (payload?.isDeleteImage) {
        await fs.promises.unlink(`./src/public/${foundCategory.thumbnail}`);
      }

      const forceDeleteCategoryById = await this.prisma.category.delete({
        where: {
          id: categoryId,
        },
      });
      return forceDeleteCategoryById;
    } catch (error) {
      console.log({ forceDeleteCategoryByIdError: error });
      return error;
    }
  }
}

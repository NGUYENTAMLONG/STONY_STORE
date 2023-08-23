import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, Product, ProductVariant } from '@prisma/client';
import { CreateProductDto } from './dtos/create-product.dto';
import { EXCEPTION_PRODUCT } from './constants/product.constant';
import { CreateProductVariantDto } from './dtos/create-product-variant';
import { Variant } from './dtos/search-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import * as fs from 'fs';
import { DeleteDetailImagesDto } from './dtos/delete.dtos';
@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Product[]> {
    try {
      const offset = (page - 1) * limit;
      const products = await this.prisma.product.findMany({
        skip: offset,
        take: limit,
      });
      return products;
    } catch (error) {
      console.log({ productListError: error });
      return error;
    }
  }

  public async findOneById(productId: number): Promise<Product> {
    try {
      return this.prisma.product.findFirst({
        where: {
          id: productId,
          deletedAt: null,
          deletedFlg: false,
        },
        include: {
          category: true,
          subCategory: true,
          images: true,
          variants: {
            include: {
              color: {
                select: {
                  name: true,
                  nameEN: true,
                  description: true,
                  metadata: true,
                  image: true,
                },
              },
              size: {
                select: {
                  name: true,
                  description: true,
                  metadata: true,
                },
              },
              material: {
                select: {
                  name: true,
                  description: true,
                  metadata: true,
                  image: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.log({ productFindVariantbyIdError: error });
      return error;
    }
  }
  public async findVariantOfProduct(
    productId: number,
    variant?: Variant, // : Promise<ProductVariant[]>
  ) {
    try {
      let condition = {};
      if (variant === Variant.Color) {
        condition = {
          colorId: {
            not: undefined,
          },
        };
      } else if (variant === Variant.Material) {
        condition = {
          materialId: {
            not: undefined,
          },
        };
      } else {
        condition = {
          sizeId: {
            not: undefined,
          },
        };
      }
      return this.prisma.productVariant.findMany({
        where: {
          productId: productId,
          deletedAt: null,
          deletedFlg: false,
          colorId: {
            not: undefined,
          },
        },
        include:
          variant === 'color'
            ? {
                color: true,
              }
            : variant === 'material'
            ? {
                material: true,
              }
            : {
                size: true,
              },
      });
    } catch (error) {
      console.log({ productFindOnebyIdError: error });
      return error;
    }
  }

  public async createOneProduct(
    payload: CreateProductDto,
    thumbnail: Express.Multer.File,
    variants?: CreateProductVariantDto[],
  ): Promise<Product> {
    try {
      if (!thumbnail) {
        throw new BadRequestException(
          EXCEPTION_PRODUCT.DOES_NOT_HAVE_THUMBNAIL,
        );
      }
      const {
        name,
        code,
        categoryId,
        subCategoryId,
        description,
        discount,
        price,
        tax,
        importPrice,
        hot,
        ...rest
      } = payload;
      const createdProduct = await this.prisma.product.create({
        data: {
          name,
          code,
          categoryId: Number(categoryId),
          description,
          discount: Number(discount),
          price: Number(price),
          tax: Number(tax),
          importPrice: Number(importPrice),
          hot: Boolean(hot),
          new: true,
          subCategoryId: Number(subCategoryId),
          thumbnail: `/images/thumbnails/${thumbnail.filename}`,
          ...rest,
        },
      });
      if (variants && variants.length > 0) {
        for (const variant of variants) {
          const { colorId, materialId, productId, sizeId, stock } = variant;
          const createProductVariant = await this.prisma.productVariant.create({
            data: {
              colorId,
              materialId,
              productId,
              sizeId,
              stock,
            },
          });
        }
      }
      return createdProduct;
    } catch (error) {
      console.log({ createProductError: error });
      return error;
    }
  }
  public async createProductVariants(
    productId: number,
    variants: CreateProductVariantDto[],
  ): Promise<any> {
    try {
      if (!productId) {
        throw new BadRequestException(EXCEPTION_PRODUCT.MUST_HAVE_PRODUCT_ID);
      }

      const foundProduct = await this.prisma.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!foundProduct) {
        throw new BadRequestException(EXCEPTION_PRODUCT.PRODUCT_NOT_FOUND);
      }

      if (variants && variants.length > 0) {
        for (const variant of variants) {
          const { colorId, materialId, productId, sizeId, stock } = variant;
          const createProductVariant = await this.prisma.productVariant.create({
            data: {
              colorId,
              materialId,
              productId: foundProduct.id,
              sizeId,
              stock,
            },
          });
        }
      } else {
        throw new BadRequestException(
          EXCEPTION_PRODUCT.MUST_HAVE_PRODUCT_VARIANTS,
        );
      }
      return 'CREATED SUCCESS';
    } catch (error) {
      console.log({ createProductVariantsError: error });
      return error;
    }
  }
  public async uploadDetailImages(
    productId: number,
    imageDetails: Express.Multer.File[],
  ): Promise<any> {
    try {
      if (!productId) {
        throw new BadRequestException(EXCEPTION_PRODUCT.MUST_HAVE_PRODUCT_ID);
      }

      const foundProduct = await this.prisma.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!foundProduct) {
        throw new BadRequestException(EXCEPTION_PRODUCT.PRODUCT_NOT_FOUND);
      }
      const dataUploads = imageDetails.map((img) => {
        return {
          imageUrl: `/images/details/${img.filename}`,
          productId: Number(productId),
        };
      });
      const updateDetailImages = await this.prisma.productImage.createMany({
        data: dataUploads,
      });
      return { productId, updateDetailImages };

      // return 'UPLOADED SUCCESS';
    } catch (error) {
      console.log({ uploadDetailImages: error });
      return error;
    }
  }
  public async softDeleteOne(productId: number): Promise<any> {
    try {
      //Check Order has product ?
      //Check Category/Subcategory has product ?
      //Check Event has product ?
      const softDeletedProduct = await this.prisma.user.update({
        where: {
          id: productId,
        },
        data: {
          deletedAt: new Date(),
          deletedFlg: true,
        },
      });
      return softDeletedProduct;
    } catch (error) {
      console.log({ softDeletedError: error });
      return error;
    }
  }
  public async restoreOne(productId: number): Promise<any> {
    try {
      //Check Order has product ?
      //Check Category/Subcategory has product ?
      //Check Event has product ?
      const restoreProduct = await this.prisma.product.update({
        where: {
          id: productId,
        },
        data: {
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return restoreProduct;
    } catch (error) {
      console.log({ restoreError: error });
      return error;
    }
  }

  public async forceDeleteOne(productId: number): Promise<any> {
    try {
      // note check cascade
      const forceDeletedUser = await this.prisma.product.delete({
        where: {
          id: productId,
        },
      });
      return forceDeletedUser;
    } catch (error) {
      console.log({ forceDeleteError: error });
      return error;
    }
  }

  public async updateOneProduct(
    productId: number,
    payload: UpdateProductDto,
    thumbnail: Express.Multer.File,
  ): Promise<Product> {
    try {
      if (!productId) {
        throw new BadRequestException(EXCEPTION_PRODUCT.MUST_HAVE_PRODUCT_ID);
      }

      const foundProduct = await this.prisma.product.findFirst({
        where: {
          id: productId,
        },
      });

      if (!foundProduct) {
        throw new BadRequestException(EXCEPTION_PRODUCT.PRODUCT_NOT_FOUND);
      }

      const {
        name,
        code,
        categoryId,
        subCategoryId,
        description,
        discount,
        price,
        tax,
        importPrice,
        hot,
        ...rest
      } = payload;
      const updatedProductData: any = {
        name,
        code,
        categoryId: Number(categoryId),
        description,
        discount: Number(discount),
        price: Number(price),
        tax: Number(tax),
        importPrice: Number(importPrice),
        hot: Boolean(hot),
        new: Boolean(rest.new),
        subCategoryId: Number(subCategoryId),
        ...rest,
      };
      if (thumbnail) {
        updatedProductData.thumbnail = `/images/thumbnails/${thumbnail.filename}`;
        //unlink old thumbnail
        if (foundProduct.thumbnail) {
          const oldThumbnailPath = `./src/public/${foundProduct.thumbnail}`;
          fs.unlink(oldThumbnailPath, (err) => {
            if (err) {
              console.error(`Error unlinking old thumbnail: ${err}`);
              // Handle the error (e.g., respond with an error message)
            } else {
              console.log('Old thumbnail unlinked successfully');
              // Continue with the update process
            }
          });
        }
      }
      const updatedProduct = await this.prisma.product.update({
        where: {
          id: productId,
        },
        data: updatedProductData,
      });
      return updatedProduct;
    } catch (error) {
      console.log({ updateProductError: error });
      return error;
    }
  }

  public async deleteImageDetails(
    payload: DeleteDetailImagesDto,
  ): Promise<any> {
    try {
      const { imageIds } = payload;

      // Check if the array of IDs is valid
      if (!imageIds || imageIds.length === 0) {
        throw new BadRequestException(EXCEPTION_PRODUCT.INVALID_ARRAY_OF_IDS);
      }
      // return imageIds;
      const forceDeletedDetailImages =
        await this.prisma.productImage.deleteMany({
          where: {
            id: {
              in: imageIds,
            },
          },
        });
      return forceDeletedDetailImages;
    } catch (error) {
      console.log({ forceDeleteError: error });
      return error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDto } from './dtos/create-product.dto';

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
      });
    } catch (error) {
      console.log({ productFindOnebyIdError: error });
      return error;
    }
  }

  public async createOneProduct(
    payload: CreateProductDto,
    variant?: any, // : Promise<Product>
  ) {
    // try {
    //   const {
    //     name,
    //     code,
    //     categoryId,
    //     description,
    //     discount,
    //     price,
    //     tax,
    //     importPrice,
    //     hot,
    //     ...rest
    //   } = payload;
    //   const createdProduct = await this.prisma.product.create({
    //     data: {
    //       name,
    //       code,
    //       categoryId,
    //       description,
    //       discount,
    //       price,
    //       tax,
    //       importPrice,
    //       hot,
    //       ...rest,
    //     },
    //   });
    //   if (variant) {
    //   }
    // } catch (error) {
    //   console.log({ createProductError: error });
    //   return error;
    // }
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
}

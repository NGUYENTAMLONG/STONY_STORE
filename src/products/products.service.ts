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

  public async createOneProduct(
    payload: CreateProductDto,
    variant?: any,
  ): Promise<Product> {
    try {
      const {
        name,
        code,
        categoryId,
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
          categoryId,
          description,
          discount,
          price,
          tax,
          importPrice,
          hot,
          ...rest,
        },
      });
      if (variant) {
      }
    } catch (error) {
      console.log({ createProductError: error });
      return error;
    }
  }
}

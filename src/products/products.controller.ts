import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async getUserList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const products = await this.productsService.getList(page, limit);
    return {
      page,
      limit,
      data: products,
    };
  }

  @Post()
  public async createProduct(@Body() payload: CreateProductDto, variant?: any) {
    return this.productsService.createOneProduct(payload, variant);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  public async getList(
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

  @Get()
  public async findOneById(
    @Param('id', new ParseIntPipe({ optional: true })) id: number,
  ) {
    const product = await this.productsService.findOneById(id);
    return product;
  }

  @Post()
  public async createProduct(@Body() payload: CreateProductDto, variant?: any) {
    return this.productsService.createOneProduct(payload, variant);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteProduct(@Param('id') id: number) {
    const result = await this.productsService.softDeleteOne(id);
    return result;
  }

  @Delete('/force-delete/:id')
  public async forceDeleteProduct(@Param('id') id: number) {
    const result = await this.productsService.forceDeleteOne(id);
    return result;
  }
  // @Delete('/soft-delete-many')
  // public async softDeleteProducts(@Body() payload: UserIdArrayDto) {
  //   const result = await this.productsService.softDeleteMultiple(payload);
  //   return result;
  // }
  // @Delete('/force-delete-many')
  // public async forceDeleteProducts(@Body() payload: UserIdArrayDto) {
  //   const result = await this.productsService.forceDeleteMultiple(payload);
  //   return result;
  // }
}

import {
  Post,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/validators/validation-file';
import {
  CreateOrderDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateOrderDto,
} from './dtos/orders.dto';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  public async getOrderList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const orders = await this.ordersService.getList(page, limit);
    return {
      page,
      limit,
      data: orders,
    };
  }

  @Post()
  public async createOrder(@Body() payload: CreateOrderDto) {
    return this.ordersService.createOneOrder(payload);
  }

  @Patch('/restore/:id')
  public async restoreOrder(
    @Param('id', new ParseIntPipe({ optional: true })) orderId: number,
  ) {
    return this.ordersService.restoreOneOrder(orderId);
  }

  @Patch(':id')
  public async updateOrder(
    // @Param('id') orderId: number,
    @Param('id', new ParseIntPipe({ optional: true })) orderId: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.updateOneOrder(orderId, payload);
  }

  @Get(':id')
  public async findOrder(
    @Param('id', new ParseIntPipe({ optional: true })) orderId: number,
  ) {
    return this.ordersService.getOneById(orderId);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteBanner(
    @Param('id', new ParseIntPipe({ optional: true })) orderId: number,
  ) {
    return this.ordersService.softDeleteOneById(orderId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.ordersService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.ordersService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteOrder(
    @Param('id', new ParseIntPipe({ optional: true })) orderId: number,
  ) {
    return this.ordersService.forceDeleteOneById(orderId);
  }
}

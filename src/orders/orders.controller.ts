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
  UseGuards,
  Request,
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
  UpdateOrderStatusDto,
} from './dtos/orders.dto';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';
import { OrdersService } from './orders.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserType } from '@prisma/client';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @Roles(UserType.STAFF)
  @UseGuards(JwtAuthGuard)
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

  @Get('me')
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async getMyOrders(
    @Request() req,
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const orders = await this.ordersService.getMyOrderList(
      req.user,
      page,
      limit,
    );
    return {
      page,
      limit,
      data: orders,
    };
  }

  @Post()
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async createOrder(@Request() req, @Body() payload: CreateOrderDto) {
    return this.ordersService.createOneOrder(req.user, payload);
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

  @Patch(':id/change-status')
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async updateOrderStatus(
    @Request() req,
    @Param('id', new ParseIntPipe({ optional: true })) orderId: number,
    @Body() payload: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOneOrderStatus(req.user, orderId, payload);
  }

  @Patch(':id/cancel-order')
  @Roles(UserType.CUSTOMER, UserType.ADMIN)
  @UseGuards(JwtAuthGuard)
  public async cancelOrder() {
    return 'OK';
  }

  @Get(':id')
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async findOrder(
    @Request() req,
    @Param('id', new ParseIntPipe({ optional: true })) orderId: number,
  ) {
    return this.ordersService.getOneById(req.user, orderId);
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

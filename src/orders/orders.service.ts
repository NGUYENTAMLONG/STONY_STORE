import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Order } from '@prisma/client';
import {
  CreateOrderDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateOrderDto,
} from './dtos/orders.dto';
import { EXCEPTION_ORDER } from './constants/order.constant';
import * as fs from 'fs';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Order[]> {
    try {
      const offset = (page - 1) * limit;
      const orders = await this.prisma.order.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return orders;
    } catch (error) {
      console.log({ orderListError: error });
      return error;
    }
  }

  public async createOneOrder(payload: CreateOrderDto): Promise<Order> {
    try {
      const { description, metadata } = payload;
      //   const createOrder = await this.prisma.order.create({
      //     data: {

      //       description,
      //       metadata: metadata,
      //     },
      //   });
      //   return createOrder;
    } catch (error) {
      console.log({ createOrderError: error });
      return error;
    }
  }

  public async updateOneOrder(
    orderId: number,
    payload: UpdateOrderDto,
  ): Promise<Order> {
    try {
      const { title, description, metadata } = payload;
      const foundOrder = await this.prisma.order.findFirst({
        where: {
          id: orderId,
        },
      });
      if (!foundOrder) {
        throw new BadRequestException(EXCEPTION_ORDER.ORDER_NOT_FOUND);
      }
      //   let data = {
      //     title,
      //     description,
      //     metadata: metadata,
      //   };

      //   const updateBanner = await this.prisma.order.update({
      //     where: {
      //       id: orderId,
      //     },
      //     data,
      //   });
      //   return updateBanner;
    } catch (error) {
      console.log({ updateOrderError: error });
      return error;
    }
  }

  public async getOneById(orderId: number): Promise<Order> {
    try {
      const foundOrderById = await this.prisma.order.findFirst({
        where: {
          id: orderId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundOrderById;
    } catch (error) {
      console.log({ foundOrderByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(orderId: number): Promise<Order> {
    try {
      const foundOrder = await this.prisma.order.findFirst({
        where: {
          id: orderId,
        },
      });
      if (!foundOrder) {
        throw new BadRequestException(EXCEPTION_ORDER.ORDER_NOT_FOUND);
      }

      const softDeleteOrderById = await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteOrderById;
    } catch (error) {
      console.log({ softDeleteOrderByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleOrders = await this.prisma.order.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleOrders;
    } catch (error) {
      console.log({ softDeleteMultipleOrderByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleOrders = await this.prisma.order.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleOrders;
    } catch (error) {
      console.log({ restoreMultipleOrderByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneOrder(orderId: number): Promise<Order> {
    try {
      const foundOrder = await this.prisma.order.findFirst({
        where: {
          id: orderId,
          deletedFlg: true,
        },
      });
      if (!foundOrder) {
        throw new BadRequestException(EXCEPTION_ORDER.ORDER_NOT_FOUND);
      }

      const restoreOrderById = await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreOrderById;
    } catch (error) {
      console.log({ restoreOrderByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(orderId: number): Promise<Order> {
    try {
      const foundOrder = await this.prisma.order.findFirst({
        where: {
          id: orderId,
        },
      });
      if (!foundOrder) {
        throw new BadRequestException(EXCEPTION_ORDER.ORDER_NOT_FOUND);
      }
      const forceDeleteOrderById = await this.prisma.order.delete({
        where: {
          id: orderId,
        },
      });
      return forceDeleteOrderById;
    } catch (error) {
      console.log({ forceDeleteOrderByIdError: error });
      return error;
    }
  }

  /// *****
  public async forceDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleOrders = await this.prisma.order.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleOrders;
    } catch (error) {
      console.log({ softDeleteMultipleOrderByIdArrayError: error });
      return error;
    }
  }
}

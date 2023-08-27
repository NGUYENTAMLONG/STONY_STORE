import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { Order } from '@prisma/client';
import {
  CreateOrderDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateOrderDto,
} from './dtos/orders.dto';
import { EXCEPTION_ORDER } from './constants/order.constant';
import { v4 as uuidv4 } from 'uuid';
import { EXCEPTION_ADDRESS } from 'src/addresses/constants/address.constant';
import { validatePhoneNumber } from 'src/helpers/validate.helper';

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

  public async getMyOrderList(
    customer: User,
    page: number,
    limit: number,
  ): Promise<Order[]> {
    try {
      const offset = (page - 1) * limit;
      const orders = await this.prisma.order.findMany({
        where: {
          customerId: customer.id,
          deletedAt: null,
          deletedFlg: false,
          createdBy: customer.id,
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

  public async createOneOrder(
    customer: User,
    payload: CreateOrderDto,
  ): Promise<Order> {
    try {
      const {
        addressId,
        phoneRecipient,
        note,
        discount,
        tax,
        phoneDeliver,
        subtotal,
        items,
      } = payload;

      const foundAddress = await this.prisma.address.findFirst({
        where: {
          id: addressId,
          userId: customer.id,
          createdBy: customer.id,
        },
      });
      if (!foundAddress) {
        throw new BadRequestException(EXCEPTION_ADDRESS.ADDRESS_NOT_FOUND);
      }

      const phoneNumberIsValid = validatePhoneNumber(phoneRecipient);
      if (!phoneNumberIsValid) {
        throw new BadRequestException(EXCEPTION_ORDER.PHONE_NUMBER_IS_INVALID);
      }
      let metadata = {};
      if (note) {
        metadata['note'] = note;
      }
      const initOrder = await this.prisma.order.create({
        data: {
          code: uuidv4(),
          addressId,
          phoneRecipient,
          customerId: customer.id,
          total: 0,
          createdBy: customer.id,
          metadata: JSON.stringify(metadata),
          discount,
          tax,
          phoneDeliver,
          subtotal: Number(subtotal),
          // purchaseHistoryId:1
        },
      });

      for (const item of items) {
        const { productId, quantity, variantId } = item;
        const createOrderItem = this.prisma.orderItem.create({
          data: {
            productId,
            variantId,
            quantity,
            orderId: initOrder.id,
            createdBy: customer.id,
          },
        });
      }
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

  public async getOneById(customer: User, orderId: number): Promise<Order> {
    try {
      const foundOrderById = await this.prisma.order.findFirst({
        where: {
          id: orderId,
          deletedAt: null,
          deletedFlg: false,
          createdBy: customer.id,
        },
        include: {
          items: {
            where: {
              deletedAt: null,
              deletedFlg: false,
              createdBy: customer.id,
            },
            include: {
              product: true,
              variant: true,
            },
          },
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

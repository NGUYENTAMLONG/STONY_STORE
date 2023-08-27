import {
  BadRequestException,
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { CartItem, PrismaClient, User } from '@prisma/client';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { EXCEPTION_CART } from './constants/cart.constant';
import { EXCEPTION_PRODUCT } from 'src/products/constants/product.constant';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaClient) {}

  async checkCart(user: User): Promise<any> {
    try {
      const getCart = await this.prisma.cart.findFirst({
        where: {
          userId: user.id,
          deletedAt: null,
          deletedFlg: false,
        },
        include: {
          cartItems: true,
        },
      });
      if (!getCart) {
        throw new BadRequestException(EXCEPTION_CART.CART_NOT_FOUND);
      }

      return getCart;
    } catch (error) {
      return error;
    }
  }

  async addToCart(payload: AddToCartDto, user: User): Promise<CartItem> {
    try {
      const { productId, productVariantId, quantity } = payload;

      const foundProduct = await this.prisma.product.findFirst({
        where: {
          id: productId,
          deletedAt: null,
          deletedFlg: false,
        },
        include: {
          variants: {
            where: {
              id: productVariantId,
            },
          },
        },
      });
      if (!foundProduct || !foundProduct.variants[0]) {
        throw new BadRequestException(EXCEPTION_PRODUCT.PRODUCT_DOES_NOT_EXIST);
      }
      if (quantity > foundProduct.variants[0].quantity) {
        throw new BadRequestException(EXCEPTION_CART.EXCEED_THE_QUANTITY);
      }
      const foundCart = await this.prisma.cart.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (!foundCart) {
        throw new HttpException(EXCEPTION_CART.CART_DOES_NOT_EXIST, 500);
      }
      const createCartItem = await this.prisma.cartItem.create({
        data: {
          cartId: foundCart.id,
          productId,
          variantId: productVariantId,
          quantity,
          createdBy: user.id,
        },
      });
      return createCartItem;
    } catch (error) {
      return error;
    }
  }

  async removeOne(cartId: number, user: User): Promise<CartItem> {
    try {
      const foundCartItem = await this.prisma.cartItem.findFirst({
        where: {
          id: cartId,
          createdBy: user.id,
        },
      });
      if (!foundCartItem) {
        throw new UnauthorizedException();
      }
      const removedCartItem = await this.prisma.cartItem.delete({
        where: {
          id: foundCartItem.id,
        },
      });
      return removedCartItem;
    } catch (error) {
      return error;
    }
  }
}

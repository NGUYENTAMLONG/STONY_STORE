import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Delete,
  ParseIntPipe,
  Param,
  Get,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dtos/add-to-cart.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartService: CartsService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @Roles(UserType.CUSTOMER)
  public async checkMyCart(@Request() req) {
    return this.cartService.checkCart(req.user);
  }

  @Post('add-to-cart')
  @UseGuards(JwtAuthGuard)
  @Roles(UserType.CUSTOMER)
  public async addToCart(@Body() payload: AddToCartDto, @Request() req) {
    return this.cartService.addToCart(payload, req.user);
  }

  @Delete('remove/:id')
  @UseGuards(JwtAuthGuard)
  @Roles(UserType.CUSTOMER)
  public async remove(
    @Param(':id', new ParseIntPipe({ optional: true })) cartId: number,
    @Request() req,
  ) {
    return this.cartService.removeOne(cartId, req.user);
  }
}

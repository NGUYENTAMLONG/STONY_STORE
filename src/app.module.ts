import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { InitializationsModule } from './initializations/initializations.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { PermissionsModule } from './permissions/permissions.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizationGuard } from './auth/authorization.guard';
import { ColorsModule } from './colors/colors.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { BannersModule } from './banners/banners.module';
import { CategoriesModule } from './categories/categories.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/src/public'),
    }),
    UsersModule,
    ProductsModule,
    InitializationsModule,
    AuthModule,
    PermissionsModule,
    ColorsModule,
    OrdersModule,
    CartsModule,
    OrderItemsModule,
    CartItemsModule,
    BannersModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
  ],
})
export class AppModule {}

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
import { MaterialsModule } from './materials/materials.module';
import { ContactsModule } from './contacts/contacts.module';
import { SizesModule } from './sizes/sizes.module';
import { AddressesModule } from './addresses/addresses.module';
import { VouchersModule } from './voucher/vouchers.module';
import { EventsModule } from './events/events.module';
import { RedisModule } from './redis/redis.module';
import { MailerService } from './mailer/mailer.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/src/public'),
    }), /// ---> localhost:3000/images/thumbnail/name.jpg
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
    MaterialsModule,
    ContactsModule,
    SizesModule,
    AddressesModule,
    VouchersModule,
    EventsModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard,
    },
    MailerService,
  ],
})
export class AppModule {}

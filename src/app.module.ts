import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { InitializationsModule } from './initializations/initializations.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule, ProductsModule, InitializationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

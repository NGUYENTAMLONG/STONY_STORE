import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { PrismaClient, UserType } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaClient,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/route-for-admin')
  @Roles(UserType.ADMIN)
  @UseGuards(JwtAuthGuard)
  getForAdmin(@Request() req): string {
    return req.user;
  }

  @Get('/route-for-staff')
  @Roles()
  @UseGuards(JwtAuthGuard)
  getForStaff(@Request() req) {
    return req.user;
  }

  @Get('/route-for-customer')
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  getForCustomer(): string {
    return 'PASSED (CUSTOMER)';
  }
}

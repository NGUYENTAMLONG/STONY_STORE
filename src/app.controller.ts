import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/route-for-admin')
  getForAdmin(): string {
    return 'PASSED (ADMIN)';
  }

  @Get('/route-for-staff')
  getForStaff(): string {
    return 'PASSED (STAFF)';
  }

  @Get('/route-for-customer')
  getForCustomer(): string {
    return 'PASSED (CUSTOMER)';
  }
}

import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  public async getUserList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const users = await this.usersService.getList(page, limit);
    return {
      page,
      limit,
      data: users,
    };
  }
}

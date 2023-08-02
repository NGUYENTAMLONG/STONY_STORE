import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ChangePasswordDto,
  ChangeUsernameDto,
  UserIdArrayDto,
} from './dtos/users.dto';
import { UpdateProfileDto } from './dtos/profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
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

  @Get('/:id')
  public async getUserById(
    @Param('id', new ParseIntPipe({ optional: true })) id: number,
  ) {
    const user = await this.usersService.findUserById(id);
    return user;
  }

  @Get('/get-by-username')
  public async getUserByUsername(@Body() username: string) {
    const user = await this.usersService.findOneByUsername(username);
    return user;
  }

  @Get('/get-by-email')
  public async getUserByEmail(@Body() email: string) {
    const user = await this.usersService.findOneByEmail(email);
    return user;
  }

  @Put('/update-profile/:id')
  public async updateProfile(
    @Param(':id', new ParseIntPipe({ optional: true })) id: number,
    @Body() payload: UpdateProfileDto,
  ) {
    const result = await this.usersService.updateProfile(id, payload);
    return result;
  }

  @Patch('/change-password/:id')
  public async changePassword(
    @Param(':id', new ParseIntPipe({ optional: true })) id: number,
    @Body() payload: ChangePasswordDto,
  ) {
    const result = await this.usersService.changePassword(id, payload);
    return result;
  }

  @Patch('/change-username/:id')
  public async changeUsername(
    @Param(':id', new ParseIntPipe({ optional: true })) id: number,
    @Body() payload: ChangeUsernameDto,
  ) {
    const result = await this.usersService.changeUsername(id, payload);
    return result;
  }

  @Delete('/soft-delete/:id')
  public async softDeleteUser(@Param('id') id: number) {
    const user = await this.usersService.softDeleteOne(id);
    return user;
  }
  @Delete('/force-delete/:id')
  public async forceDeleteUser(@Param('id') id: number) {
    const user = await this.usersService.forceDeleteOne(id);
    return user;
  }
  @Delete('/soft-delete-many')
  public async softDeleteUsers(@Body() payload: UserIdArrayDto) {
    const user = await this.usersService.softDeleteMultiple(payload);
    return user;
  }
  @Delete('/force-delete-many')
  public async forceDeleteUsers(@Body() payload: UserIdArrayDto) {
    const user = await this.usersService.forceDeleteMultiple(payload);
    return user;
  }
}

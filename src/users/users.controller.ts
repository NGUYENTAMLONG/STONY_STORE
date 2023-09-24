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
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ChangePasswordDto,
  ChangeUsernameDto,
  UserIdArrayDto,
} from './dtos/users.dto';
import { UpdateProfileDto } from './dtos/profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserType } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/validators/validation-file';
import { diskStorage } from 'multer';
import { editFileName } from 'src/helpers/file.helper';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @Roles()
  // @UseGuards(AuthorizationGuard)
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @Roles(UserType.CUSTOMER)
  public async getUserByMyself(@Request() req) {
    const user = await this.usersService.findUserByMySelf(req.user);
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

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @Roles()
  public async getUserById(
    @Param('id', new ParseIntPipe({ optional: true })) id: number,
  ) {
    const user = await this.usersService.findUserById(id);
    return user;
  }

  @Put('/update-profile')
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async updateProfile(
    @Request() req,
    @Body() payload: UpdateProfileDto,
  ) {
    const result = await this.usersService.updateProfile(req.user, payload);
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
    const result = await this.usersService.softDeleteOne(id);
    return result;
  }
  @Delete('/force-delete/:id')
  public async forceDeleteUser(@Param('id') id: number) {
    const result = await this.usersService.forceDeleteOne(id);
    return result;
  }
  @Delete('/soft-delete-many')
  public async softDeleteUsers(@Body() payload: UserIdArrayDto) {
    const result = await this.usersService.softDeleteMultiple(payload);
    return result;
  }
  @Delete('/force-delete-many')
  public async forceDeleteUsers(@Body() payload: UserIdArrayDto) {
    const result = await this.usersService.forceDeleteMultiple(payload);
    return result;
  }

  @Patch('/update-avatar')
  @UseGuards(JwtAuthGuard)
  @Roles(UserType.CUSTOMER)
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: {
        fileSize: 5000000,
      },
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './src/public/avatars',
        filename: editFileName,
      }),
    }),
  )
  public async updateAvatarProfile(
    @Request() req,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const result = await this.usersService.updateAvatar(req.user, avatar);
    return result;
  }

  // ________________________ Purchase History________________________
  @Get('/history/purchase')
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async getPurchaseHistory(
    @Request() req,
    @Query('page', new ParseIntPipe({ optional: true })) page?,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?,
  ) {
    const result = await this.usersService.findPurchaseHistory(
      req.user,
      page,
      limit,
    );
    return result;
  }
}

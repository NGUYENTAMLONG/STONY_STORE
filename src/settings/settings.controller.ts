import {
  Post,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserType } from '@prisma/client';
import { UserSettingService } from './settings.service';
import { UpdateSettingDto } from './dtos/update-setting.dto';
@Controller('settings')
export class UserSettingsController {
  constructor(private readonly usserSettingService: UserSettingService) {}

  @Get()
  public async getSizeList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const sizes = await this.usserSettingService.getList(page, limit);
    return {
      page,
      limit,
      data: sizes,
    };
  }

  @Get('me')
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async getSettingInfor(@Request() req) {
    return this.usserSettingService.getSettingInfor(req.user);
  }

  @Post()
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async createUserSetting(@Body() payload: any, @Request() req) {
    return this.usserSettingService.createOneUserSettings(req.user, payload);
  }

  @Patch()
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async updateSetting(
    @Request() req,
    @Body() payload: UpdateSettingDto,
  ) {
    return this.usserSettingService.updateUserSetting(req.user, payload);
  }

  @Patch('admin-update/:id')
  @Roles() //just for admin
  @UseGuards(JwtAuthGuard)
  public async updateSettingAdmin(
    @Request() req,
    @Param('id', new ParseIntPipe({ optional: true })) userSettingId: number,
    @Body() payload: any,
  ) {
    return this.usserSettingService.adminUpdateSetting(
      req.user,
      userSettingId,
      payload,
    );
  }
}

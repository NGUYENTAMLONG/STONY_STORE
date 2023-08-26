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
@Controller('sizes')
export class SizesController {
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

  @Post()
  @Roles(UserType.CUSTOMER)
  @UseGuards(JwtAuthGuard)
  public async createUserSetting(@Body() payload: any, @Request() req) {
    return this.usserSettingService.createOneUserSettings(req.user, payload);
  }

  // @Patch(':id')
  // public async updateSize(
  //   @Param('id', new ParseIntPipe({ optional: true })) userSettingId: number,
  //   @Body() payload: any,
  // ) {
  //   return this.usserSettingService.updateOneSize(userSettingId, payload);
  // }

  // @Get(':id')
  // public async findSize(
  //   @Param('id', new ParseIntPipe({ optional: true })) userSettingId: number,
  // ) {
  //   return this.usserSettingService.getOneById(userSettingId);
  // }
}

import {
  Post,
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import {
  CreateVoucherDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateVoucherDto,
} from './dtos/vouchers.dto';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Get()
  public async getVoucherList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const vouchers = await this.vouchersService.getList(page, limit);
    return {
      page,
      limit,
      data: vouchers,
    };
  }

  @Post()
  public async createVoucher(@Body() payload: CreateVoucherDto) {
    return this.vouchersService.createOneVoucher(payload);
  }

  @Patch('/restore/:id')
  public async restoreVoucher(
    @Param('id', new ParseIntPipe({ optional: true })) voucherId: number,
  ) {
    return this.vouchersService.restoreOneVoucher(voucherId);
  }

  @Patch(':id')
  public async updateVoucher(
    // @Param('id') voucherId: number,
    @Param('id', new ParseIntPipe({ optional: true })) voucherId: number,
    @Body() payload: UpdateVoucherDto,
  ) {
    return this.vouchersService.updateOneVoucher(voucherId, payload);
  }

  @Get(':id')
  public async findBanner(
    @Param('id', new ParseIntPipe({ optional: true })) voucherId: number,
  ) {
    return this.vouchersService.getOneById(voucherId);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteBanner(
    @Param('id', new ParseIntPipe({ optional: true })) voucherId: number,
  ) {
    return this.vouchersService.softDeleteOneById(voucherId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.vouchersService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.vouchersService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteVoucher(
    @Param('id', new ParseIntPipe({ optional: true })) voucherId: number,
  ) {
    return this.vouchersService.forceDeleteOneById(voucherId);
  }
}

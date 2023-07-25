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
  CreateAddressDto,
  DeleteMultipleDto,
  RestoreMultipleDto,
  UpdateAddressDto,
} from './dtos/addresses.dto';
import { AddressesService } from './addresses.service';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  public async getAddressList(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
  ) {
    const addresses = await this.addressesService.getList(page, limit);
    return {
      page,
      limit,
      data: addresses,
    };
  }

  @Post()
  public async createAddress(@Body() payload: CreateAddressDto) {
    return this.addressesService.createOneAddress(payload);
  }

  @Patch('/restore/:id')
  public async restoreAddress(
    @Param('id', new ParseIntPipe({ optional: true })) addressId: number,
  ) {
    return this.addressesService.restoreOneAddress(addressId);
  }

  @Patch(':id')
  public async updateAddress(
    @Param('id', new ParseIntPipe({ optional: true })) addressId: number,
    @Body() payload: UpdateAddressDto,
  ) {
    return this.addressesService.updateOneAddress(addressId, payload);
  }

  @Get(':id')
  public async findAddress(
    @Param('id', new ParseIntPipe({ optional: true })) addressId: number,
  ) {
    return this.addressesService.getOneById(addressId);
  }

  @Delete('/soft-delete/:id')
  public async softDeleteAddress(
    @Param('id', new ParseIntPipe({ optional: true })) addressId: number,
  ) {
    return this.addressesService.softDeleteOneById(addressId);
  }

  @Delete('/soft-delete-multiple')
  async deleteMultipleRecords(@Body() payload: DeleteMultipleDto) {
    return this.addressesService.softDeleteMultiple(payload);
  }

  @Put('/restore-multiple')
  async restoreMultipleRecords(@Body() payload: RestoreMultipleDto) {
    return this.addressesService.restoreMultiple(payload);
  }

  @Delete('/force-delete/:id')
  public async forceDeleteAddress(
    @Param('id', new ParseIntPipe({ optional: true })) addressId: number,
  ) {
    return this.addressesService.forceDeleteOneById(addressId);
  }

  @Patch(':id')
  public async changeAddressDefault(
    @Param('id', new ParseIntPipe({ optional: true })) addressId: number,
    @Param('id', new ParseIntPipe({ optional: true })) userId: number,
  ) {
    return this.addressesService.changeAddressDefault(addressId, userId);
  }
}

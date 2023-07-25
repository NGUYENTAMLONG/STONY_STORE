import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient, Voucher } from '@prisma/client';
import {
  CreateVoucherDto,
  UpdateVoucherDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
} from './dtos/vouchers.dto';
import { EXCEPTION_VOUCHER } from './contants/voucher.constant';

@Injectable()
export class VouchersService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Voucher[]> {
    try {
      const offset = (page - 1) * limit;
      const vouchers = await this.prisma.voucher.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return vouchers;
    } catch (error) {
      console.log({ voucherListError: error });
      return error;
    }
  }

  public async createOneVoucher(payload: CreateVoucherDto): Promise<Voucher> {
    try {
      const { code, discount, quantity, validFrom, validTo, metadata } =
        payload;
      const checkExistedVoucher = await this.prisma.voucher.findFirst({
        where: {
          code,
        },
      });
      if (checkExistedVoucher) {
        throw new BadRequestException(EXCEPTION_VOUCHER.VOUCHER_EXISTED);
      }
      const createVoucher = await this.prisma.voucher.create({
        data: {
          code,
          discount,
          quantity,
          validFrom,
          validTo,
          metadata: metadata,
        },
      });
      return createVoucher;
    } catch (error) {
      console.log({ createVoucherError: error });
      return error;
    }
  }

  public async updateOneVoucher(
    voucherId: number,
    payload: UpdateVoucherDto,
  ): Promise<Voucher> {
    try {
      const { code, discount, quantity, validFrom, validTo, metadata } =
        payload;
      const foundVoucher = await this.prisma.voucher.findFirst({
        where: {
          id: voucherId,
        },
      });
      if (!foundVoucher) {
        throw new BadRequestException(EXCEPTION_VOUCHER.VOUCHER_NOT_FOUND);
      }
      let data = {
        code,
        discount,
        quantity,
        validFrom,
        validTo,
        metadata: metadata,
      };

      const updateVoucher = await this.prisma.voucher.update({
        where: {
          id: voucherId,
        },
        data,
      });
      return updateVoucher;
    } catch (error) {
      console.log({ updateVoucherError: error });
      return error;
    }
  }

  public async getOneById(voucherId: number): Promise<Voucher> {
    try {
      const foundVoucherById = await this.prisma.voucher.findFirst({
        where: {
          id: voucherId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundVoucherById;
    } catch (error) {
      console.log({ foundVoucherByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(voucherId: number): Promise<Voucher> {
    try {
      const foundVoucher = await this.prisma.voucher.findFirst({
        where: {
          id: voucherId,
        },
      });
      if (!foundVoucher) {
        throw new BadRequestException(EXCEPTION_VOUCHER.VOUCHER_NOT_FOUND);
      }

      const softDeleteVoucherById = await this.prisma.voucher.update({
        where: {
          id: voucherId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteVoucherById;
    } catch (error) {
      console.log({ softDeleteVoucherByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleVouchers = await this.prisma.voucher.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleVouchers;
    } catch (error) {
      console.log({ softDeleteMultipleVoucherByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleVouchers = await this.prisma.voucher.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleVouchers;
    } catch (error) {
      console.log({ restoreMultipleVoucherByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneVoucher(voucherId: number): Promise<Voucher> {
    try {
      const foundVoucher = await this.prisma.voucher.findFirst({
        where: {
          id: voucherId,
          deletedFlg: true,
        },
      });
      if (!foundVoucher) {
        throw new BadRequestException(EXCEPTION_VOUCHER.VOUCHER_NOT_FOUND);
      }

      const restoreVoucherById = await this.prisma.voucher.update({
        where: {
          id: voucherId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreVoucherById;
    } catch (error) {
      console.log({ restoreVoucherByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(voucherId: number): Promise<Voucher> {
    try {
      const foundVoucher = await this.prisma.voucher.findFirst({
        where: {
          id: voucherId,
        },
      });
      if (!foundVoucher) {
        throw new BadRequestException(EXCEPTION_VOUCHER.VOUCHER_NOT_FOUND);
      }

      const forceDeleteVoucherById = await this.prisma.voucher.delete({
        where: {
          id: voucherId,
        },
      });
      return forceDeleteVoucherById;
    } catch (error) {
      console.log({ forceDeleteVoucherByIdError: error });
      return error;
    }
  }

  /// *****
  public async forceDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleVouchers = await this.prisma.voucher.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleVouchers;
    } catch (error) {
      console.log({ softDeleteMultipleVoucherByIdArrayError: error });
      return error;
    }
  }
}

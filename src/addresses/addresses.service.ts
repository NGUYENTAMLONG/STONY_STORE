import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Address, PrismaClient, User } from '@prisma/client';
import {
  CreateAddressDto,
  DeleteMultipleDto,
  IsDeleteImageDto,
  RestoreMultipleDto,
  UpdateAddressDto,
} from './dtos/addresses.dto';
import * as fs from 'fs';
import { EXCEPTION_ADDRESS } from './constants/address.constant';

@Injectable()
export class AddressesService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<Address[]> {
    try {
      const offset = (page - 1) * limit;
      const addresses = await this.prisma.address.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return addresses;
    } catch (error) {
      console.log({ addressListError: error });
      return error;
    }
  }

  public async createOneAddress(
    payload: CreateAddressDto,
    userReq: User,
  ): Promise<Address> {
    try {
      const {
        userId,
        city,
        state,
        postalCode,
        street,
        detailAddress,
        metadata,
      } = payload;

      const createAddress = await this.prisma.address.create({
        data: {
          userId,
          city,
          state,
          postalCode,
          street,
          detailAddress,
          metadata: metadata,
          createdBy: userReq.id,
        },
      });
      return createAddress;
    } catch (error) {
      console.log({ createAddressError: error });
      return error;
    }
  }

  public async updateOneAddress(
    addressId: number,
    payload: UpdateAddressDto,
  ): Promise<Address> {
    try {
      const {
        userId,
        city,
        state,
        postalCode,
        street,
        detailAddress,
        metadata,
      } = payload;
      const foundAddress = await this.prisma.address.findFirst({
        where: {
          id: addressId,
        },
      });
      if (!foundAddress) {
        throw new BadRequestException(EXCEPTION_ADDRESS.ADDRESS_NOT_FOUND);
      }
      let data = {
        userId,
        city,
        state,
        postalCode,
        street,
        detailAddress,
        metadata: metadata,
      };
      const updateAddress = await this.prisma.address.update({
        where: {
          id: addressId,
        },
        data,
      });
      return updateAddress;
    } catch (error) {
      console.log({ updateAddressError: error });
      return error;
    }
  }

  public async getOneById(addressId: number): Promise<Address> {
    try {
      const foundAddressById = await this.prisma.address.findFirst({
        where: {
          id: addressId,
          deletedAt: null,
          deletedFlg: false,
        },
      });
      return foundAddressById;
    } catch (error) {
      console.log({ foundAddressByIdError: error });
      return error;
    }
  }

  public async softDeleteOneById(addressId: number): Promise<Address> {
    try {
      const foundAddress = await this.prisma.address.findFirst({
        where: {
          id: addressId,
        },
      });
      if (!foundAddress) {
        throw new BadRequestException(EXCEPTION_ADDRESS.ADDRESS_NOT_FOUND);
      }

      const softDeleteAddressById = await this.prisma.address.update({
        where: {
          id: addressId,
        },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });
      return softDeleteAddressById;
    } catch (error) {
      console.log({ softDeleteAddressByIdError: error });
      return error;
    }
  }

  public async softDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleAddresses = await this.prisma.address.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleAddresses;
    } catch (error) {
      console.log({ softDeleteMultipleAddressByIdArrayError: error });
      return error;
    }
  }

  public async restoreMultiple(payload: RestoreMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const restoreMultipleAddresses = await this.prisma.address.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });

      return restoreMultipleAddresses;
    } catch (error) {
      console.log({ restoreMultipleAddressByIdArrayError: error });
      return error;
    }
  }

  public async restoreOneAddress(addressId: number): Promise<Address> {
    try {
      const foundAddress = await this.prisma.address.findFirst({
        where: {
          id: addressId,
          deletedFlg: true,
        },
      });
      if (!foundAddress) {
        throw new BadRequestException(EXCEPTION_ADDRESS.ADDRESS_NOT_FOUND);
      }

      const restoreAddressById = await this.prisma.address.update({
        where: {
          id: addressId,
        },
        data: {
          deletedFlg: false,
          deletedAt: null,
        },
      });
      return restoreAddressById;
    } catch (error) {
      console.log({ restoreAddressByIdError: error });
      return error;
    }
  }

  public async forceDeleteOneById(addressId: number): Promise<Address> {
    try {
      const foundAddress = await this.prisma.address.findFirst({
        where: {
          id: addressId,
        },
      });
      if (!foundAddress) {
        throw new BadRequestException(EXCEPTION_ADDRESS.ADDRESS_NOT_FOUND);
      }

      const forceDeleteAddressById = await this.prisma.address.delete({
        where: {
          id: addressId,
        },
      });
      return forceDeleteAddressById;
    } catch (error) {
      console.log({ forceDeleteAddressByIdError: error });
      return error;
    }
  }

  /// *****
  public async forceDeleteMultiple(payload: DeleteMultipleDto): Promise<any> {
    try {
      const { ids } = payload;
      const softDeleteMultipleAddresses = await this.prisma.address.updateMany({
        where: { id: { in: ids } },
        data: {
          deletedFlg: true,
          deletedAt: new Date(),
        },
      });

      return softDeleteMultipleAddresses;
    } catch (error) {
      console.log({ softDeleteMultipleAddressByIdArrayError: error });
      return error;
    }
  }
  public async changeAddressDefault(
    addressId: number,
    userId: number,
  ): Promise<Address> {
    try {
      const foundAddress = await this.prisma.address.findFirst({
        where: {
          id: addressId,
          deletedFlg: false,
          deletedAt: null,
        },
      });
      if (!foundAddress) {
        throw new BadRequestException(EXCEPTION_ADDRESS.ADDRESS_NOT_FOUND);
      }
      await this.prisma.address.updateMany({
        where: {
          userId: userId,
          deletedFlg: false,
          deletedAt: null,
        },
        data: {
          isDefault: false,
        },
      });
      const changedNewAddressDefault = await this.prisma.address.update({
        where: {
          id: addressId,
        },
        data: {
          isDefault: true,
        },
      });

      return changedNewAddressDefault;
    } catch (error) {
      console.log({ changeAddressDefaultError: error });
      return error;
    }
  }
}

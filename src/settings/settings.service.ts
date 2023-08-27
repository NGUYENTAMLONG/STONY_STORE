import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient, User, UserSetting } from '@prisma/client';

@Injectable()
export class UserSettingService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<UserSetting[]> {
    try {
      const offset = (page - 1) * limit;
      const userSettings = await this.prisma.userSetting.findMany({
        where: {
          deletedAt: null,
          deletedFlg: false,
        },
        skip: offset,
        take: limit,
      });
      return userSettings;
    } catch (error) {
      console.log({ getUserSettingsListError: error });
      return error;
    }
  }

  public async createOneUserSettings(
    userReq: User,
    payload: any,
  ): Promise<UserSetting> {
    try {
      const { customerId } = payload;
      const createUserSetting = await this.prisma.userSetting.create({
        data: {
          userId: customerId,
          createdBy: userReq.id,
        },
      });
      return createUserSetting;
    } catch (error) {
      console.log({ createUserSettingError: error });
      return error;
    }
  }

  // public async updateOneUserSetting(payload: any): Promise<UserSetting> {
  //   try {
  //     const { name, description, metadata } = payload;
  //     const foundSize = await this.prisma.size.findFirst({
  //       where: {
  //         id: sizeId,
  //       },
  //     });
  //     if (!foundSize) {
  //       throw new BadRequestException(EXCEPTION_SIZE.SIZE_NOT_FOUND);
  //     }
  //     let data = {
  //       name,
  //       description,
  //       metadata: metadata,
  //     };
  //     const updateSize = await this.prisma.size.update({
  //       where: {
  //         id: sizeId,
  //       },
  //       data,
  //     });
  //     return updateSize;
  //   } catch (error) {
  //     console.log({ updateSizeError: error });
  //     return error;
  //   }
  // }

  // public async getOneById(sizeId: number): Promise<UserSetting> {
  //   try {
  //     const foundSizeById = await this.prisma.size.findFirst({
  //       where: {
  //         id: sizeId,
  //         deletedAt: null,
  //         deletedFlg: false,
  //       },
  //     });
  //     return foundSizeById;
  //   } catch (error) {
  //     console.log({ foundSizeByIdError: error });
  //     return error;
  //   }
  // }
}

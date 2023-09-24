import { BadRequestException, Injectable } from '@nestjs/common';
import {
  Languages,
  PrismaClient,
  Themes,
  User,
  UserSetting,
} from '@prisma/client';
import { UpdateSettingDto } from './dtos/update-setting.dto';
import { EXCEPTION_SETTING } from './constants/setting.constant';

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

  public async getSettingInfor(customer: User): Promise<UserSetting> {
    try {
      const getSetting = await this.prisma.userSetting.findFirst({
        where: {
          userId: customer.id,
          deletedAt: null,
          deletedFlg: false,
          createdBy: customer.id,
        },
      });
      return getSetting;
    } catch (error) {
      console.log({ foundSettingError: error });
      return error;
    }
  }
  public async updateUserSetting(
    customer: User,
    payload: UpdateSettingDto,
  ): Promise<UserSetting> {
    try {
      const { darkMode, languages, themes } = payload;
      const updatedUserSetting = await this.prisma.userSetting.update({
        where: {
          userId: customer.id,
        },
        data: {
          darkMode,
          language: Languages[languages],
          themes: Themes[themes],
          updatedBy: customer.id,
        },
      });
      return updatedUserSetting;
    } catch (error) {
      console.log({ updatedUserSettingError: error });
      return error;
    }
  }
  public async adminUpdateSetting(
    customer: User,
    userSettingId: number,
    payload: UpdateSettingDto,
  ): Promise<UserSetting> {
    try {
      const { darkMode, languages, themes } = payload;
      const foundSetting = await this.prisma.userSetting.findFirst({
        where: {
          id: userSettingId,
        },
      });
      if (!foundSetting) {
        throw new BadRequestException(EXCEPTION_SETTING.SETTING_NOT_FOUND);
      }

      const updatedUserSetting = await this.prisma.userSetting.update({
        where: {
          id: userSettingId,
        },
        data: {
          darkMode,
          language: Languages[languages],
          themes: Themes[themes],
          updatedBy: customer.id,
        },
      });
      return updatedUserSetting;
    } catch (error) {
      console.log({ adminUpdatedUserSettingError: error });
      return error;
    }
  }
}

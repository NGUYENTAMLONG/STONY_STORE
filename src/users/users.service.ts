import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient, Role, User } from '@prisma/client';
import {
  ChangePasswordDto,
  ChangeUsernameDto,
  UserIdArrayDto,
} from './dtos/users.dto';
import { UpdateProfileDto } from './dtos/profile.dto';
import { EXCEPTION_USER } from './constants/user.contant';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  public async getList(page: number, limit: number): Promise<User[]> {
    try {
      const offset = (page - 1) * limit;
      const users = await this.prisma.user.findMany({
        skip: offset,
        take: limit,
      });
      return users;
    } catch (error) {
      console.log({ userListError: error });
      return error;
    }
  }

  public async findUserById(userId: number): Promise<User> {
    try {
      return this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      console.log({ userFindOnebyIdError: error });
      return error;
    }
  }
  public async findOneByUsername(username: string): Promise<User> {
    try {
      return this.prisma.user.findFirst({
        where: {
          username,
        },
      });
    } catch (error) {
      console.log({ userFindOnebyUsernameError: error });
      return error;
    }
  }
  public async findOneByEmail(email: string): Promise<User> {
    try {
      const foundProfile = await this.prisma.profile.findFirst({
        where: {
          email,
        },
        include: { user: true },
      });
      const foundUserbyEmail = await this.prisma.user.findFirst({
        where: {
          id: foundProfile.user.id,
        },
      });
      return foundUserbyEmail;
    } catch (error) {
      console.log({ userFindOnebyEmailError: error });
      return error;
    }
  }
  public async softDeleteOne(userId: number): Promise<User> {
    try {
      const softDeletedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          deletedAt: new Date(),
          deletedFlg: true,
        },
      });
      return softDeletedUser;
    } catch (error) {
      console.log({ softDeletedError: error });
      return error;
    }
  }
  public async forceDeleteOne(userId: number): Promise<User> {
    try {
      const forceDeletedUser = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return forceDeletedUser;
    } catch (error) {
      console.log({ forceDeleteError: error });
      return error;
    }
  }

  public async updateProfile(
    profileId: number,
    payload: UpdateProfileDto,
  ): Promise<any> {
    try {
      const { firstName, lastName, gender, email, phoneNumber, address } =
        payload;
      const updatedUser = await this.prisma.profile.update({
        where: {
          id: profileId,
        },
        data: {
          firstName,
          lastName,
          gender: gender[gender],
          email,
          phoneNumber,
          address,
        },
      });
      return updatedUser;
    } catch (error) {
      console.log({ updatedUserError: error });
      return error;
    }
  }
  public async changePassword(
    userId: number,
    payload: ChangePasswordDto,
  ): Promise<any> {
    try {
      const { newPassword, passwordConfirm } = payload;
      if (newPassword !== passwordConfirm) {
        throw new BadRequestException(EXCEPTION_USER.PASSWORD_DOES_NOT_MATCH);
      }
      const foundUser = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!foundUser) {
        throw new NotFoundException(EXCEPTION_USER.USER_NOT_FOUND);
      }
      const comparePassword = await bcrypt.compare(
        newPassword,
        foundUser.password,
      );
      if (comparePassword) {
        throw new BadRequestException(
          EXCEPTION_USER.NEW_PASSWORD_AND_OLD_PASSWORD_ARE_THE_SAME,
        );
      }
      const saltOrRounds = process.env.SALT_ROUNDS;
      const hashedNewPassword = await bcrypt.hash(
        newPassword,
        Number(saltOrRounds),
      );
      const changedPassword = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedNewPassword,
        },
      });
      return changedPassword;
    } catch (error) {
      console.log({ changePasswordError: error });
      return error;
    }
  }
  public async changeUsername(
    userId: number,
    payload: ChangeUsernameDto,
  ): Promise<any> {
    try {
      const { newUsername } = payload;
      const foundUser = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (!foundUser) {
        throw new NotFoundException(EXCEPTION_USER.USER_NOT_FOUND);
      }
      if (newUsername === foundUser.username) {
        throw new BadRequestException(
          EXCEPTION_USER.NEW_USERNAME_AND_OLD_USERNAME_ARE_THE_SAME,
        );
      }

      const checkExistedUsername = await this.prisma.user.findFirst({
        where: {
          username: newUsername,
        },
      });
      if (checkExistedUsername) {
        throw new BadRequestException(EXCEPTION_USER.USERNAME_EXISTED);
      }
      const changedUsername = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          username: newUsername,
        },
      });
      return changedUsername;
    } catch (error) {
      console.log({ updatedUsernameError: error });
      return error;
    }
  }
  public async forceDeleteMultiple(payload: UserIdArrayDto): Promise<any> {
    try {
      const { userIds } = payload;
      const forceDeletedUserMultiple = await this.prisma.user.deleteMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });
      return forceDeletedUserMultiple;
    } catch (error) {
      console.log({ forceDeleteError: error });
      return error;
    }
  }
  public async softDeleteMultiple(payload: UserIdArrayDto): Promise<any> {
    try {
      const { userIds } = payload;
      const softDeletedUserMultiple = await this.prisma.user.updateMany({
        where: {
          id: {
            in: userIds,
          },
        },
        data: {
          deletedAt: new Date(),
          deletedFlg: true,
        },
      });
      return softDeletedUserMultiple;
    } catch (error) {
      console.log({ forceDeleteError: error });
      return error;
    }
  }
  public async accessPermission(
    userId: number, // : Promise<User>
  ) {
    return this.prisma.user.findFirst({
      where: { id: userId },
      include: { roles: { include: { permissions: true } } },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient, Role, User } from '@prisma/client';

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
  public async accessPermission(
    userId: number, // : Promise<User>
  ) {
    return this.prisma.user.findFirst({
      where: { id: userId },
      include: { roles: { include: { permissions: true } } },
    });
  }
}

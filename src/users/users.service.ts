import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

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
}

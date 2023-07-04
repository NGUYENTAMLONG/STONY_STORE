import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

@Injectable()
export class InitializationsService implements OnModuleInit {
  constructor(private readonly prisma: PrismaClient) {}

  async onModuleInit() {
    await this.initialAdmin();
  }

  private async initialAdmin() {
    try {
      const foundExistedAdmin = await this.prisma.user.findFirst({
        where: {
          userType: 'ADMIN',
        },
      });
      if (!foundExistedAdmin) {
        const usernameAdmin = process.env.USERNAME_ADMIN;
        const passwordAdmin = process.env.PASSWORD_ADMIN;
        const saltOrRounds = process.env.SALT_ROUNDS;
        const hashedPassword = await bcrypt.hash(
          passwordAdmin,
          Number(saltOrRounds),
        );
        const initialAdmin = await this.prisma.user.create({
          data: {
            username: usernameAdmin,
            password: hashedPassword,
            userType: 'ADMIN',
          },
        });
      }
      console.log('🌻🌻🌻 Initialized Successful !!! 🍔🍔🍔');
    } catch (error) {
      console.log({ initialAdminError: error });
      return error;
    }
  }

  private async initalCatgories() {
    try {
      const foundExistedAdmin = await this.prisma.user.findFirst({
        where: {
          userType: 'ADMIN',
        },
      });
      if (!foundExistedAdmin) {
        const usernameAdmin = process.env.USERNAME_ADMIN;
        const passwordAdmin = process.env.PASSWORD_ADMIN;
        const saltOrRounds = process.env.SALT_ROUNDS;
        const hashedPassword = await bcrypt.hash(
          passwordAdmin,
          Number(saltOrRounds),
        );
        const initialAdmin = await this.prisma.user.create({
          data: {
            username: usernameAdmin,
            password: hashedPassword,
            userType: 'ADMIN',
          },
        });
      }
      console.log('🌻🌻🌻 Initialized Successful !!! 🍔🍔🍔');
    } catch (error) {
      console.log({ initialAdminError: error });
      return error;
    }
  }
}

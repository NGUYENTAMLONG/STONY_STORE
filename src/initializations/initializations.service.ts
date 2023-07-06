import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { COLORS } from 'src/configs/contants.config';
config();

@Injectable()
export class InitializationsService implements OnModuleInit {
  constructor(private readonly prisma: PrismaClient) {}

  async onModuleInit() {
    await this.initialAdmin();
    await this.initialColors();
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
            isAdministrator: true,
          },
        });
      }
      console.log('🌻🌻🌻 Initialized Successful !!! 🍔🍔🍔');
    } catch (error) {
      console.log({ initialAdminError: error });
      return error;
    }
  }

  private async initialColors() {
    try {
      const countExisted = await this.prisma.color.count();
      if (countExisted === 0) {
        for (const color of COLORS) {
          await this.prisma.color.create({
            data: {
              name: color.name,
              nameEN: color.nameEN,
              image: `${process.env.BASE_URI}:${process.env.PORT}/images/colors/${color.imageName}`,
              description: color.description,
            },
          });
        }
      }
      console.log('❤️💛💚 Initialized Colors Successful !!! 💙💜🖤');
    } catch (error) {
      console.log({ initialColorsError: error });
      return error;
    }
  }
  // private async initalCatgories() {
  //   try {
  //     const foundExistedAdmin = await this.prisma.user.findFirst({
  //       where: {
  //         userType: 'ADMIN',
  //       },
  //     });
  //     if (!foundExistedAdmin) {
  //       const usernameAdmin = process.env.USERNAME_ADMIN;
  //       const passwordAdmin = process.env.PASSWORD_ADMIN;
  //       const saltOrRounds = process.env.SALT_ROUNDS;
  //       const hashedPassword = await bcrypt.hash(
  //         passwordAdmin,
  //         Number(saltOrRounds),
  //       );
  //       const initialAdmin = await this.prisma.user.create({
  //         data: {
  //           username: usernameAdmin,
  //           password: hashedPassword,
  //           userType: 'ADMIN',
  //           isAdministrator: true,
  //         },
  //       });
  //     }
  //     console.log('🌻🌻🌻 Initialized Successful !!! 🍔🍔🍔');
  //   } catch (error) {
  //     console.log({ initialAdminError: error });
  //     return error;
  //   }
  // }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import {
  CATEGORIES,
  COLORS,
  MATERIALS,
  SIZES,
} from 'src/configs/contants.config';
config();

@Injectable()
export class InitializationsService implements OnModuleInit {
  constructor(private readonly prisma: PrismaClient) {}

  async onModuleInit() {
    await this.initialAdmin();
    await this.initialColors();
    await this.initialSizes();
    await this.initialMaterials();
    // await this.initalCatgories();
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

  private async initialSizes() {
    try {
      const countExisted = await this.prisma.size.count();
      if (countExisted === 0) {
        for (const size of SIZES) {
          await this.prisma.size.create({
            data: {
              name: size.name,
              description: size.description,
            },
          });
        }
      }
      console.log('🐡🐬🐢 Initialized Sizes Successful !!! 🐊😻🐘');
    } catch (error) {
      console.log({ initialSizesError: error });
      return error;
    }
  }

  private async initialMaterials() {
    try {
      const countExisted = await this.prisma.material.count();
      if (countExisted === 0) {
        for (const material of MATERIALS) {
          await this.prisma.material.create({
            data: {
              name: material.name,
              // nameEN: material.nameEN,
              image: `${process.env.BASE_URI}:${process.env.PORT}/images/materials/${material.imageName}`,
              description: material.description,
            },
          });
        }
      }
      console.log('🐡🐬🐢 Initialized materials Successful !!! 🐊😻🐘');
    } catch (error) {
      console.log({ initialMaterialsError: error });
      return error;
    }
  }
  private async initalCatgories() {
    try {
      const countExistedCategories = await this.prisma.category.count();
      const a = await this.prisma.subCategory.findMany({}); //
      // if (countExistedCategories === 0) {
      // for (const category of CATEGORIES) {
      //   let createdCategory = await this.prisma.category.create({
      //     data: {
      //       name: category.name,
      //       nameEN: category.nameEN,
      //       description: category.description,
      //     },
      //   }); // category main

      //   // if (category?.subCatgories.length > 0) {
      //   //   for (const subCategory of category.subCatgories) {
      //   //     console.log({
      //   //       name: subCategory.name,
      //   //       description: subCategory.description,
      //   //       nameEN: subCategory.nameEN,
      //   //       categoryId: createdCategory.id,
      //   //     });
      //   //     await this.prisma.subCategory.create({
      //   //       data: {
      //   //         name: subCategory.name,
      //   //         description: subCategory.description,
      //   //         nameEN: subCategory.nameEN,
      //   //         categoryId: createdCategory.id,
      //   //       },
      //   //     }); //
      //   //   }
      //   // }
      // }
      // }
      console.log('👘👖👠👡👞 Initialized categories Successful !!! 👒🎩👟👢 ');
    } catch (error) {
      console.log({ initialCategoriesError: error });
      return error;
    }
  }
}

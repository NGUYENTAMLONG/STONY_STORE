/*
  Warnings:

  - You are about to drop the column `type` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Banner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameEN]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameEN]` on the table `Color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Material` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Size` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameEN]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `type`,
    ADD COLUMN `source` TEXT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `brand`;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `deletedFlg` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `metadata` JSON NULL,

    UNIQUE INDEX `Brand_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BrandsOnProducts` (
    `productId` INTEGER NOT NULL,
    `brandId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedBy` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`productId`, `brandId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Banner_title_key` ON `Banner`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_nameEN_key` ON `Category`(`nameEN`);

-- CreateIndex
CREATE UNIQUE INDEX `Color_name_key` ON `Color`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Color_nameEN_key` ON `Color`(`nameEN`);

-- CreateIndex
CREATE UNIQUE INDEX `Keyword_value_key` ON `Keyword`(`value`);

-- CreateIndex
CREATE UNIQUE INDEX `Material_name_key` ON `Material`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_name_key` ON `Product`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_code_key` ON `Product`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `Profile_phoneNumber_key` ON `Profile`(`phoneNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `Size_name_key` ON `Size`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `SubCategory_name_key` ON `SubCategory`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `SubCategory_nameEN_key` ON `SubCategory`(`nameEN`);

-- AddForeignKey
ALTER TABLE `BrandsOnProducts` ADD CONSTRAINT `BrandsOnProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BrandsOnProducts` ADD CONSTRAINT `BrandsOnProducts_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `Brand`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

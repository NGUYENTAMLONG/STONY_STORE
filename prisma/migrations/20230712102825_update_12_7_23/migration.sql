/*
  Warnings:

  - Added the required column `subCategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `subCategoryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `SubCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nameEN` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `categoryId` INTEGER NOT NULL,
    `introduction` VARCHAR(191) NULL,
    `metadata` JSON NULL,
    `deletedFlg` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubCategory` ADD CONSTRAINT `SubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

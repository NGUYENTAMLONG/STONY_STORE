/*
  Warnings:

  - You are about to drop the column `createdAt` on the `keyword` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `keyword` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `keyword` table. All the data in the column will be lost.
  - You are about to drop the column `deletedFlg` on the `keyword` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `keyword` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `keyword` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `keyword` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `post` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `keyword` DROP FOREIGN KEY `Keyword_postId_fkey`;

-- DropIndex
DROP INDEX `Post_author_key` ON `post`;

-- AlterTable
ALTER TABLE `keyword` DROP COLUMN `createdAt`,
    DROP COLUMN `createdBy`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `deletedFlg`,
    DROP COLUMN `metadata`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `updatedBy`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `author`,
    ADD COLUMN `authorId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Session` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ipAddress` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userAgent` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `region` VARCHAR(191) NULL,
    `timezone` VARCHAR(191) NULL,
    `countryCode` VARCHAR(191) NULL,
    `browser` VARCHAR(191) NULL,
    `operatingSystem` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `metadata` JSON NULL,
    `deletedFlg` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Keyword` ADD CONSTRAINT `Keyword_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

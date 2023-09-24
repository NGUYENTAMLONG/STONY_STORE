/*
  Warnings:

  - You are about to drop the column `Type` on the `contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contact` DROP COLUMN `Type`,
    ADD COLUMN `type` ENUM('BUG', 'EXCHANGE', 'ANOTHER') NOT NULL DEFAULT 'EXCHANGE';

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `biography` TEXT NULL,
    ADD COLUMN `birthday` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `privateNotificationId` INTEGER NULL,
    ADD COLUMN `publicNotificationId` INTEGER NULL;

-- CreateTable
CREATE TABLE `CancelOrderReason` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(191) NOT NULL,
    `initializedBy` ENUM('SYSTEM', 'USER') NOT NULL DEFAULT 'SYSTEM',
    `acceptance` BOOLEAN NOT NULL DEFAULT false,
    `orderId` INTEGER NOT NULL,
    `metadata` JSON NULL,
    `deletedFlg` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PublicNotification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `preview` VARCHAR(191) NULL,
    `content` TEXT NOT NULL,
    `attachment` TEXT NULL,
    `thumbnail` TEXT NULL,
    `link` TEXT NULL,
    `senderId` INTEGER NOT NULL,
    `type` ENUM('EVENT', 'ADVERTISEMENT', 'ACCOUNT', 'WARNING', 'ANOTHER') NOT NULL DEFAULT 'ANOTHER',
    `recipientId` INTEGER NOT NULL,
    `metadata` JSON NULL,
    `deletedFlg` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PublicNotification_senderId_key`(`senderId`),
    UNIQUE INDEX `PublicNotification_recipientId_key`(`recipientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrivateNotification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `preview` VARCHAR(191) NULL,
    `content` TEXT NOT NULL,
    `attachment` TEXT NULL,
    `thumbnail` TEXT NULL,
    `link` TEXT NULL,
    `type` ENUM('EVENT', 'ADVERTISEMENT', 'ACCOUNT', 'WARNING', 'ANOTHER') NOT NULL DEFAULT 'ANOTHER',
    `senderId` INTEGER NOT NULL,
    `recipientId` INTEGER NOT NULL,
    `metadata` JSON NULL,
    `deletedFlg` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PrivateNotification_senderId_key`(`senderId`),
    UNIQUE INDEX `PrivateNotification_recipientId_key`(`recipientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_publicNotificationId_fkey` FOREIGN KEY (`publicNotificationId`) REFERENCES `PublicNotification`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_privateNotificationId_fkey` FOREIGN KEY (`privateNotificationId`) REFERENCES `PrivateNotification`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CancelOrderReason` ADD CONSTRAINT `CancelOrderReason_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublicNotification` ADD CONSTRAINT `PublicNotification_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublicNotification` ADD CONSTRAINT `PublicNotification_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateNotification` ADD CONSTRAINT `PrivateNotification_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateNotification` ADD CONSTRAINT `PrivateNotification_recipientId_fkey` FOREIGN KEY (`recipientId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

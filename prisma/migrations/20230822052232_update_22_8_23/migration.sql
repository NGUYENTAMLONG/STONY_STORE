-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_eventId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `thumbnail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `lastLogin` DATETIME(3) NULL,
    ADD COLUMN `lastLogout` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `UserSetting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastLogin` DATETIME(3) NULL,
    `lastLogout` DATETIME(3) NULL,
    `darkMode` BOOLEAN NOT NULL DEFAULT false,
    `themes` ENUM('NONE', 'HOLLIDAY') NULL DEFAULT 'NONE',
    `language` ENUM('VIETNAMESE', 'ENGLISH', 'CHINESE', 'JAPANESE') NULL DEFAULT 'VIETNAMESE',
    `userId` INTEGER NOT NULL,
    `deletedFlg` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `metadata` JSON NULL,

    UNIQUE INDEX `UserSetting_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserSetting` ADD CONSTRAINT `UserSetting_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

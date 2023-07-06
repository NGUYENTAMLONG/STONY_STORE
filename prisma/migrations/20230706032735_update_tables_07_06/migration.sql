/*
  Warnings:

  - Added the required column `code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAdministrator` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `color` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `discount` DOUBLE NULL,
    ADD COLUMN `hot` BOOLEAN NULL,
    ADD COLUMN `importPrice` DOUBLE NULL,
    ADD COLUMN `new` BOOLEAN NULL,
    ADD COLUMN `status` ENUM('INSTOCK', 'AVAILABLE', 'SOLD_OUT') NOT NULL DEFAULT 'AVAILABLE',
    ADD COLUMN `tax` DOUBLE NULL;

-- AlterTable
ALTER TABLE `productvariant` ADD COLUMN `materialId` INTEGER NULL;

-- AlterTable
ALTER TABLE `size` ADD COLUMN `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isAdministrator` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `Material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
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
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNumber` VARCHAR(191) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `orderDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `subtotal` DOUBLE NOT NULL,
    `tax` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL,
    `total` DOUBLE NOT NULL,
    `addressId` INTEGER NOT NULL,
    `phoneRecipient` VARCHAR(191) NOT NULL,
    `phoneDeliver` VARCHAR(191) NULL,
    `status` ENUM('WAITING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'REQUIRED_ACTION', 'CANCELED', 'CLOSED') NOT NULL DEFAULT 'WAITING',
    `metadata` JSON NULL,
    `deletedFlg` BOOLEAN NOT NULL DEFAULT false,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedBy` INTEGER NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `voucherId` INTEGER NULL,

    UNIQUE INDEX `Order_orderNumber_key`(`orderNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `discount` DOUBLE NOT NULL,
    `validFrom` DATETIME(3) NULL,
    `validTo` DATETIME(3) NULL,

    UNIQUE INDEX `Voucher_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `variantId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `status` ENUM('WAITING', 'CONFIRMED', 'SHIPPING', 'COMPLETED', 'REQUIRED_ACTION', 'CANCELED', 'CLOSED') NOT NULL DEFAULT 'WAITING',
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
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Voucher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `ProductVariant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

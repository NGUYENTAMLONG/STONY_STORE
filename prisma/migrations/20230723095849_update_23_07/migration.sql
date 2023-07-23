/*
  Warnings:

  - You are about to drop the column `desc` on the `banner` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `avatar` DROP FOREIGN KEY `Avatar_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `cartitem` DROP FOREIGN KEY `CartItem_variantId_fkey`;

-- DropForeignKey
ALTER TABLE `contact` DROP FOREIGN KEY `Contact_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_voucherId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_variantId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_subCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `productimage` DROP FOREIGN KEY `ProductImage_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productvariant` DROP FOREIGN KEY `ProductVariant_colorId_fkey`;

-- DropForeignKey
ALTER TABLE `productvariant` DROP FOREIGN KEY `ProductVariant_materialId_fkey`;

-- DropForeignKey
ALTER TABLE `productvariant` DROP FOREIGN KEY `ProductVariant_productId_fkey`;

-- DropForeignKey
ALTER TABLE `productvariant` DROP FOREIGN KEY `ProductVariant_sizeId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `role` DROP FOREIGN KEY `Role_userId_fkey`;

-- DropForeignKey
ALTER TABLE `subcategory` DROP FOREIGN KEY `SubCategory_categoryId_fkey`;

-- AlterTable
ALTER TABLE `banner` DROP COLUMN `desc`,
    ADD COLUMN `description` TEXT NULL;

-- AddForeignKey
ALTER TABLE `Role` ADD CONSTRAINT `Role_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avatar` ADD CONSTRAINT `Avatar_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `ProductVariant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubCategory` ADD CONSTRAINT `SubCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subCategoryId_fkey` FOREIGN KEY (`subCategoryId`) REFERENCES `SubCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_colorId_fkey` FOREIGN KEY (`colorId`) REFERENCES `Color`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_sizeId_fkey` FOREIGN KEY (`sizeId`) REFERENCES `Size`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `Material`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `Address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Voucher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_variantId_fkey` FOREIGN KEY (`variantId`) REFERENCES `ProductVariant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

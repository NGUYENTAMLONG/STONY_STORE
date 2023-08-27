/*
  Warnings:

  - You are about to drop the column `orderNumber` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Order_orderNumber_key` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `orderNumber`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    MODIFY `subtotal` DOUBLE NULL,
    MODIFY `tax` DOUBLE NULL,
    MODIFY `discount` DOUBLE NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `quantity` INTEGER NULL,
    ADD COLUMN `stock` INTEGER NULL;

-- AlterTable
ALTER TABLE `productvariant` ADD COLUMN `quantity` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_code_key` ON `Order`(`code`);

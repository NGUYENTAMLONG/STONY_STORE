/*
  Warnings:

  - You are about to drop the column `recipientId` on the `publicnotification` table. All the data in the column will be lost.
  - You are about to drop the column `publicNotificationId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `publicnotification` DROP FOREIGN KEY `PublicNotification_recipientId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_publicNotificationId_fkey`;

-- AlterTable
ALTER TABLE `publicnotification` DROP COLUMN `recipientId`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `publicNotificationId`;

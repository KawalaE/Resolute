/*
  Warnings:

  - You are about to alter the column `assignedToUserId` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(256)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_assignedToUserId_fkey`;

-- AlterTable
ALTER TABLE `Comment` MODIFY `assignedToUserId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

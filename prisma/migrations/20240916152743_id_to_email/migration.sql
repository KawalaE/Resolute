/*
  Warnings:

  - You are about to drop the column `assignedToUserEmail` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_assignedToUserEmail_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `assignedToUserEmail`,
    ADD COLUMN `assignedToUserId` VARCHAR(256) NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

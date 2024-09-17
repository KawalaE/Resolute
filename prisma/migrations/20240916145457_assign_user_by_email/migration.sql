/*
  Warnings:

  - You are about to drop the column `assignedToUserId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_assignedToUserId_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `assignedToUserId`,
    ADD COLUMN `assignedToUserEmail` VARCHAR(256) NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_assignedToUserEmail_fkey` FOREIGN KEY (`assignedToUserEmail`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `_CommentToIssue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CommentToIssue` DROP FOREIGN KEY `_CommentToIssue_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CommentToIssue` DROP FOREIGN KEY `_CommentToIssue_B_fkey`;

-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `assignToIssueId` INTEGER NULL;

-- DropTable
DROP TABLE `_CommentToIssue`;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_assignToIssueId_fkey` FOREIGN KEY (`assignToIssueId`) REFERENCES `Issue`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

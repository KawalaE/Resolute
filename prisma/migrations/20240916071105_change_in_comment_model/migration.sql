/*
  Warnings:

  - You are about to drop the column `assignedToIssueId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_assignedToIssueId_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `assignedToIssueId`;

-- CreateTable
CREATE TABLE `_CommentToIssue` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CommentToIssue_AB_unique`(`A`, `B`),
    INDEX `_CommentToIssue_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CommentToIssue` ADD CONSTRAINT `_CommentToIssue_A_fkey` FOREIGN KEY (`A`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CommentToIssue` ADD CONSTRAINT `_CommentToIssue_B_fkey` FOREIGN KEY (`B`) REFERENCES `Issue`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

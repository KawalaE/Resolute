/*
  Warnings:

  - You are about to drop the `Update` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Update` DROP FOREIGN KEY `Update_assignedToIssueId_fkey`;

-- DropTable
DROP TABLE `Update`;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedToIssueId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_assignedToIssueId_fkey` FOREIGN KEY (`assignedToIssueId`) REFERENCES `Issue`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

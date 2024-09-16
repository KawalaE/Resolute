-- AlterTable
ALTER TABLE `Issue` MODIFY `description` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Update` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `assignedToIssueId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Update` ADD CONSTRAINT `Update_assignedToIssueId_fkey` FOREIGN KEY (`assignedToIssueId`) REFERENCES `Issue`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

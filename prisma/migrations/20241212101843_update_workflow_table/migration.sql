-- AlterTable
ALTER TABLE `workflow` ADD COLUMN `lastRunAt` DATETIME(3) NULL,
    ADD COLUMN `lastRunId` VARCHAR(191) NULL,
    ADD COLUMN `lastRunStatus` VARCHAR(191) NULL;

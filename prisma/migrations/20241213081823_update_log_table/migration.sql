-- AlterTable
ALTER TABLE `workflowexecutionlog` ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

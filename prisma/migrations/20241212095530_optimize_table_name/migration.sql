/*
  Warnings:

  - You are about to drop the `executionphase` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `executionphase` DROP FOREIGN KEY `ExecutionPhase_workflowExecutionId_fkey`;

-- DropTable
DROP TABLE `executionphase`;

-- CreateTable
CREATE TABLE `WorkflowExecutionPhase` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `node` LONGTEXT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startedTime` DATETIME(3) NULL,
    `completedTime` DATETIME(3) NULL,
    `inputs` LONGTEXT NULL,
    `outputs` LONGTEXT NULL,
    `workflowExecutionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkflowExecutionPhase` ADD CONSTRAINT `WorkflowExecutionPhase_workflowExecutionId_fkey` FOREIGN KEY (`workflowExecutionId`) REFERENCES `WorkflowExecution`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

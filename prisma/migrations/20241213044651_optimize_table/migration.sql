/*
  Warnings:

  - Made the column `definition` on table `workflowexecution` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `workflowexecution` MODIFY `definition` LONGTEXT NOT NULL;

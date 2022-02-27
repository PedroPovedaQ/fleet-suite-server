/*
  Warnings:

  - You are about to drop the column `commentsId` on the `Driver` table. All the data in the column will be lost.
  - You are about to drop the column `truckId` on the `Driver` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Driver.commentsId_unique";

-- DropIndex
DROP INDEX "Driver.truckId_unique";

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "commentsId",
DROP COLUMN "truckId";

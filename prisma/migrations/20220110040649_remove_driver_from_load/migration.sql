/*
  Warnings:

  - You are about to drop the column `driverId` on the `Load` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_driverId_fkey";

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "driverId";

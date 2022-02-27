/*
  Warnings:

  - You are about to drop the column `truckId` on the `Trailer` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trailer" DROP CONSTRAINT "Trailer_truckId_fkey";

-- AlterTable
ALTER TABLE "Trailer" DROP COLUMN "truckId";

/*
  Warnings:

  - Made the column `status` on table `Truck` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Truck" ALTER COLUMN "status" SET NOT NULL;

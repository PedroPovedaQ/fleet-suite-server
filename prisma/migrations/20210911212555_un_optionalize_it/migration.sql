/*
  Warnings:

  - Made the column `updatedAt` on table `Load` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Load" ALTER COLUMN "updatedAt" SET NOT NULL;

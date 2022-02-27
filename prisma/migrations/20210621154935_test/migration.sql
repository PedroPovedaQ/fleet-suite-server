/*
  Warnings:

  - You are about to drop the column `trailerId` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_trailerId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "trailerId";

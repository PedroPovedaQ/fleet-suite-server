/*
  Warnings:

  - You are about to drop the column `categoryId` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_categoryId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "categoryId";

/*
  Warnings:

  - You are about to drop the column `created` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `loadId` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Location` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_loadId_fkey";

-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "route" JSONB;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "created",
DROP COLUMN "loadId",
DROP COLUMN "updated";

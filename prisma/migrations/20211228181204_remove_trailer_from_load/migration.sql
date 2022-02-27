/*
  Warnings:

  - You are about to drop the column `trailerId` on the `Load` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_trailerId_fkey";

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "trailerId",
ALTER COLUMN "agreed" SET DEFAULT 0.0,
ALTER COLUMN "offer" SET DEFAULT 0.0;

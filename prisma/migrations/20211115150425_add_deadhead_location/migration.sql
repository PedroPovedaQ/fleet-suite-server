/*
  Warnings:

  - The `current_location` column on the `Load` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "deadhead_location" JSONB,
DROP COLUMN "current_location",
ADD COLUMN     "current_location" JSONB;

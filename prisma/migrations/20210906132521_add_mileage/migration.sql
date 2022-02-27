/*
  Warnings:

  - You are about to drop the column `distance` on the `Load` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Load" DROP COLUMN "distance",
ADD COLUMN     "deadhead_miles" INTEGER,
ADD COLUMN     "loaded_miles" INTEGER,
ADD COLUMN     "total_miles" INTEGER;

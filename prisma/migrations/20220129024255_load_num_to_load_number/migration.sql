/*
  Warnings:

  - You are about to drop the column `load_num` on the `Load` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Load" DROP COLUMN "load_num",
ADD COLUMN     "load_number" TEXT;

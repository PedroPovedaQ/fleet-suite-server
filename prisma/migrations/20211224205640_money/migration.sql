/*
  Warnings:

  - You are about to alter the column `agreed` on the `Load` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.
  - You are about to alter the column `offer` on the `Load` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.

*/
-- AlterTable
ALTER TABLE "Load" ALTER COLUMN "agreed" SET DATA TYPE DECIMAL,
ALTER COLUMN "offer" SET DATA TYPE DECIMAL;

/*
  Warnings:

  - You are about to drop the column `created` on the `Load` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Load` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Load" DROP COLUMN "created",
DROP COLUMN "updated",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

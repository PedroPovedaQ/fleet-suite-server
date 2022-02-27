/*
  Warnings:

  - You are about to drop the column `brokerage_mc_number` on the `Load` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_brokerage_mc_number_fkey";

-- AlterTable
ALTER TABLE "Brokerage" ALTER COLUMN "mc_number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "brokerage_mc_number",
ADD COLUMN     "brokerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Brokerage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

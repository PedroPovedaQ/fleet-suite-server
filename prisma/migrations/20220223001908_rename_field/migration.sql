/*
  Warnings:

  - You are about to drop the column `brokerRepId` on the `Load` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_brokerRepId_fkey";

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "brokerRepId",
ADD COLUMN     "brokerageRepId" INTEGER;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_brokerageRepId_fkey" FOREIGN KEY ("brokerageRepId") REFERENCES "BrokerageRep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

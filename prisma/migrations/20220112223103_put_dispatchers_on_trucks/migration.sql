/*
  Warnings:

  - You are about to drop the column `userId` on the `Load` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_userId_fkey";

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Truck" ADD COLUMN     "dispatcherId" INTEGER;

-- AddForeignKey
ALTER TABLE "Truck" ADD CONSTRAINT "Truck_dispatcherId_fkey" FOREIGN KEY ("dispatcherId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

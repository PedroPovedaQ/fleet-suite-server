/*
  Warnings:

  - You are about to drop the column `driverId` on the `Truck` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Truck" DROP CONSTRAINT "Truck_driverId_fkey";

-- DropIndex
DROP INDEX "Truck_driverId_unique";

-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "truckId" INTEGER;

-- AlterTable
ALTER TABLE "Truck" DROP COLUMN "driverId";

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

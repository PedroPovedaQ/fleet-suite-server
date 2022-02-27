/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[trailerId]` on the table `Truck` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_driverId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_loadId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_trailerId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_truckId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_userId_fkey";

-- AlterTable
ALTER TABLE "Truck" ADD COLUMN     "trailerId" INTEGER;

-- DropTable
DROP TABLE "Log";

-- CreateIndex
CREATE UNIQUE INDEX "Truck_trailerId_key" ON "Truck"("trailerId");

-- AddForeignKey
ALTER TABLE "Truck" ADD CONSTRAINT "Truck_trailerId_fkey" FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

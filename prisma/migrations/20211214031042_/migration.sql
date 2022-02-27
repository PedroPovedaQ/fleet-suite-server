/*
  Warnings:

  - A unique constraint covering the columns `[truckId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `truckId` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "truckId" INTEGER NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR,
ALTER COLUMN "address" SET DATA TYPE VARCHAR,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "latitude" SET DATA TYPE VARCHAR,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "longitude" SET DATA TYPE VARCHAR;

-- CreateIndex
CREATE UNIQUE INDEX "Location_truckId_key" ON "Location"("truckId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

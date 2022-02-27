/*
  Warnings:

  - You are about to drop the column `current_location` on the `Truck` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Truck" DROP COLUMN "current_location";

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "address" VARCHAR,
    "latitude" VARCHAR,
    "longitude" VARCHAR,
    "truckId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_truckId_key" ON "Location"("truckId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

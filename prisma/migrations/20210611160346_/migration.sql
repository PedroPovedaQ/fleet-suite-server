/*
  Warnings:

  - A unique constraint covering the columns `[vin_number]` on the table `Truck` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR NOT NULL,
    "key" VARCHAR NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "truckId" INTEGER,
    "driverId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Truck.vin_number_unique" ON "Truck"("vin_number");

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

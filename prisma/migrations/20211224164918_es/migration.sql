/*
  Warnings:

  - A unique constraint covering the columns `[unit_number]` on the table `Truck` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Truck_unit_number_key" ON "Truck"("unit_number");

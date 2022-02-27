/*
  Warnings:

  - You are about to drop the `DriverComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TruckComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DriverComment" DROP CONSTRAINT "DriverComment_driverId_fkey";

-- DropForeignKey
ALTER TABLE "DriverComment" DROP CONSTRAINT "DriverComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "TruckComment" DROP CONSTRAINT "TruckComment_truckId_fkey";

-- DropForeignKey
ALTER TABLE "TruckComment" DROP CONSTRAINT "TruckComment_userId_fkey";

-- DropTable
DROP TABLE "DriverComment";

-- DropTable
DROP TABLE "TruckComment";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" VARCHAR NOT NULL,
    "userId" INTEGER,
    "driverId" INTEGER,
    "truckId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

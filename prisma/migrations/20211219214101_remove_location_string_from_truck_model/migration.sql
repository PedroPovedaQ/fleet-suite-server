/*
  Warnings:

  - You are about to drop the column `current_location` on the `Load` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_truckId_fkey";

-- AlterTable
ALTER TABLE "Load" DROP COLUMN "current_location";

-- AlterTable
ALTER TABLE "Truck" ADD COLUMN     "current_location" JSONB;

-- DropTable
DROP TABLE "Location";

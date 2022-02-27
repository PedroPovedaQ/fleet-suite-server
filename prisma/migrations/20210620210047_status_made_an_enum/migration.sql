/*
  Warnings:

  - The `status` column on the `Driver` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `license_plate` on table `Truck` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('GREEN', 'RED');

-- AlterTable
ALTER TABLE "Driver" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT E'GREEN';

-- AlterTable
ALTER TABLE "Truck" ALTER COLUMN "license_plate" SET NOT NULL;

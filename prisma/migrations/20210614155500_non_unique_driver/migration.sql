-- AlterTable
ALTER TABLE "File" ADD COLUMN     "category" VARCHAR;

-- AlterIndex
ALTER INDEX "Truck.driverId_unique" RENAME TO "Truck_driverId_unique";

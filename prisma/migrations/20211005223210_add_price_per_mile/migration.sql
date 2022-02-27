-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "price_per_mile" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "price_per_mile" INTEGER;

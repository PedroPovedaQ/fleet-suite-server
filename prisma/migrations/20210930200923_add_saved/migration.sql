/*
  Warnings:

  - You are about to alter the column `deadhead_miles` on the `Load` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `loaded_miles` on the `Load` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `total_miles` on the `Load` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterEnum
ALTER TYPE "LoadStatus" ADD VALUE 'SAVED';

-- -- DropForeignKey
-- ALTER TABLE "Load" DROP CONSTRAINT "Load_truckId_fkey";

-- -- AlterTable
-- ALTER TABLE "Load" ADD COLUMN     "travel_duration" INTEGER,
-- ALTER COLUMN "truckId" DROP NOT NULL,
-- ALTER COLUMN "status" SET DEFAULT E'SAVED',
-- ALTER COLUMN "deadhead_miles" SET DATA TYPE SMALLINT,
-- ALTER COLUMN "loaded_miles" SET DATA TYPE SMALLINT,
-- ALTER COLUMN "total_miles" SET DATA TYPE SMALLINT;

-- -- AddForeignKey
-- ALTER TABLE "Load" ADD CONSTRAINT "Load_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

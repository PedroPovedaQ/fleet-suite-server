-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_trailerId_fkey";

-- DropForeignKey
ALTER TABLE "Load" DROP CONSTRAINT "Load_truckId_fkey";

-- AlterTable
ALTER TABLE "Brokerage" ALTER COLUMN "updated" DROP DEFAULT,
ALTER COLUMN "updated" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "BrokerageRep" ALTER COLUMN "updated" DROP DEFAULT,
ALTER COLUMN "updated" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Driver" ALTER COLUMN "updated" DROP DEFAULT,
ALTER COLUMN "updated" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "File" ALTER COLUMN "updated" DROP DEFAULT,
ALTER COLUMN "updated" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "updated" DROP DEFAULT,
ALTER COLUMN "updated" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Log" ALTER COLUMN "updated" DROP DEFAULT,
ALTER COLUMN "updated" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Trailer" ALTER COLUMN "updated" DROP DEFAULT,
ALTER COLUMN "updated" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Truck" ALTER COLUMN "updated" DROP DEFAULT,
ALTER COLUMN "updated" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updated" DROP DEFAULT,
ALTER COLUMN "updated" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "loadId" INTEGER,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_truckId_fkey" FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_trailerId_fkey" FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Driver.cdl_number_unique" RENAME TO "Driver_cdl_number_key";

-- RenameIndex
ALTER INDEX "Driver.email_unique" RENAME TO "Driver_email_key";

-- RenameIndex
ALTER INDEX "Trailer.vin_number_unique" RENAME TO "Trailer_vin_number_key";

-- RenameIndex
ALTER INDEX "Truck.vin_number_unique" RENAME TO "Truck_vin_number_key";

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";

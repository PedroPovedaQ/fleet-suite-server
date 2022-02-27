-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "trailerId" INTEGER;

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "trailerId" INTEGER;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "trailerId" INTEGER;

-- CreateTable
CREATE TABLE "Trailer" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year" SMALLINT NOT NULL,
    "make" VARCHAR NOT NULL,
    "model" VARCHAR NOT NULL,
    "unit_number" VARCHAR NOT NULL,
    "vin_number" VARCHAR NOT NULL,
    "registration_number" VARCHAR NOT NULL,
    "owner_name" VARCHAR NOT NULL,
    "owner_phone" VARCHAR NOT NULL,
    "owner_email" VARCHAR NOT NULL,
    "license_plate" VARCHAR NOT NULL,
    "ventilated" BOOLEAN NOT NULL DEFAULT false,
    "truckId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trailer.vin_number_unique" ON "Trailer"("vin_number");

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trailer" ADD FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

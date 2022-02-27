-- AlterTable
ALTER TABLE "Truck" ADD COLUMN     "license_plate" VARCHAR;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" VARCHAR;

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" MONEY NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "truckId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `truck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "driver" DROP CONSTRAINT "driver_commentsId_fkey";

-- DropForeignKey
ALTER TABLE "driver" DROP CONSTRAINT "driver_truckId_fkey";

-- DropForeignKey
ALTER TABLE "truck" DROP CONSTRAINT "truck_driverId_fkey";

-- DropTable
DROP TABLE "comment";

-- DropTable
DROP TABLE "driver";

-- DropTable
DROP TABLE "truck";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" VARCHAR NOT NULL,
    "userId" INTEGER,
    "driverId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "cdl_number" VARCHAR NOT NULL,
    "cdl_state" VARCHAR NOT NULL,
    "experience_years" SMALLINT NOT NULL,
    "phone" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "commentsId" INTEGER,
    "truckId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Truck" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owned_by_company" BOOLEAN NOT NULL DEFAULT false,
    "year" SMALLINT NOT NULL,
    "make" VARCHAR NOT NULL,
    "model" VARCHAR NOT NULL,
    "color" VARCHAR NOT NULL,
    "owner_name" VARCHAR NOT NULL,
    "owner_phone" VARCHAR NOT NULL,
    "owner_email" VARCHAR NOT NULL,
    "unit_number" VARCHAR NOT NULL,
    "registration_number" VARCHAR NOT NULL,
    "vin_number" VARCHAR NOT NULL,
    "comments" TEXT[],
    "driverId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL DEFAULT E'dispatcher',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver.cdl_number_unique" ON "Driver"("cdl_number");

-- CreateIndex
CREATE UNIQUE INDEX "Driver.cdl_state_unique" ON "Driver"("cdl_state");

-- CreateIndex
CREATE UNIQUE INDEX "Driver.email_unique" ON "Driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Driver.commentsId_unique" ON "Driver"("commentsId");

-- CreateIndex
CREATE UNIQUE INDEX "Driver.truckId_unique" ON "Driver"("truckId");

-- CreateIndex
CREATE UNIQUE INDEX "Truck.owner_email_unique" ON "Truck"("owner_email");

-- CreateIndex
CREATE UNIQUE INDEX "Truck.driverId_unique" ON "Truck"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD FOREIGN KEY ("truckId") REFERENCES "Truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Truck" ADD FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

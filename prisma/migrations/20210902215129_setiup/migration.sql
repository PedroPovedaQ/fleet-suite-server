/*
  Warnings:

  - You are about to drop the column `location_history` on the `Load` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Load" DROP COLUMN "location_history";

-- CreateTable
CREATE TABLE "Brokerage" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "mailing_address" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "fax_number" VARCHAR NOT NULL,
    "mc_number" VARCHAR NOT NULL,
    "flag" BOOLEAN NOT NULL DEFAULT false,
    "flag_reason" VARCHAR NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BrokerageRep" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "phone_ext" VARCHAR NOT NULL,
    "fax_number" VARCHAR NOT NULL,

    PRIMARY KEY ("id")
);

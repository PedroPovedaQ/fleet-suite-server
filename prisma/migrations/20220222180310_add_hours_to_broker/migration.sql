/*
  Warnings:

  - Added the required column `hours` to the `BrokerageRep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BrokerageRep" ADD COLUMN     "hours" VARCHAR NOT NULL;

/*
  Warnings:

  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_trailerId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_truckId_fkey";

-- AlterTable
ALTER TABLE "Trailer" ADD COLUMN     "size" VARCHAR NOT NULL DEFAULT E'58',
ADD COLUMN     "type" VARCHAR NOT NULL DEFAULT E'reefer';

-- DropTable
DROP TABLE "Expense";

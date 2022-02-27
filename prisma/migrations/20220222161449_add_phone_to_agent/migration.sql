/*
  Warnings:

  - You are about to drop the column `phone` on the `BrokerageRep` table. All the data in the column will be lost.
  - Added the required column `phone_cell` to the `BrokerageRep` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_other` to the `BrokerageRep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BrokerageRep" DROP COLUMN "phone",
ADD COLUMN     "phone_cell" VARCHAR NOT NULL,
ADD COLUMN     "phone_other" VARCHAR NOT NULL;

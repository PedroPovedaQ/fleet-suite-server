/*
  Warnings:

  - Added the required column `middle_name` to the `Driver` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Driver" ADD COLUMN     "middle_name" VARCHAR NOT NULL;

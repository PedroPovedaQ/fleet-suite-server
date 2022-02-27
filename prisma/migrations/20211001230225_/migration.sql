/*
  Warnings:

  - A unique constraint covering the columns `[mc_number]` on the table `Brokerage` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `mc_number` on the `Brokerage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Brokerage" ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "mailing_address" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "fax_number" DROP NOT NULL,
DROP COLUMN "mc_number",
ADD COLUMN     "mc_number" INTEGER NOT NULL,
ALTER COLUMN "flag" DROP NOT NULL,
ALTER COLUMN "flag_reason" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "brokerage_mc_number" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Brokerage_mc_number_key" ON "Brokerage"("mc_number");

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_brokerage_mc_number_fkey" FOREIGN KEY ("brokerage_mc_number") REFERENCES "Brokerage"("mc_number") ON DELETE SET NULL ON UPDATE CASCADE;

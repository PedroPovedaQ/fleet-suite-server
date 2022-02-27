-- CreateEnum
CREATE TYPE "BrokerStatus" AS ENUM ('ACTIVE', 'DO_NOT_USE', 'HOLD');

-- AlterTable
ALTER TABLE "Brokerage" ADD COLUMN     "city" VARCHAR,
ADD COLUMN     "status" "BrokerStatus" NOT NULL DEFAULT E'ACTIVE',
ADD COLUMN     "tax_id" VARCHAR,
ADD COLUMN     "zip" VARCHAR;

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "brokerId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Brokerage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

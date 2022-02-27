-- AlterTable
ALTER TABLE "BrokerageRep" ADD COLUMN     "brokerId" INTEGER;

-- AddForeignKey
ALTER TABLE "BrokerageRep" ADD CONSTRAINT "BrokerageRep_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "Brokerage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE "Load" ADD COLUMN     "brokerRepId" INTEGER;

-- AddForeignKey
ALTER TABLE "Load" ADD CONSTRAINT "Load_brokerRepId_fkey" FOREIGN KEY ("brokerRepId") REFERENCES "BrokerageRep"("id") ON DELETE SET NULL ON UPDATE CASCADE;

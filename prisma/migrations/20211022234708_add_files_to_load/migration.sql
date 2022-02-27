-- AlterTable
ALTER TABLE "File" ADD COLUMN     "loadId" INTEGER;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_loadId_fkey" FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE SET NULL ON UPDATE CASCADE;

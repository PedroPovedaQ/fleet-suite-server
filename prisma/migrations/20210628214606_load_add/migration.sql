-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "loadId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("loadId") REFERENCES "Load"("id") ON DELETE SET NULL ON UPDATE CASCADE;

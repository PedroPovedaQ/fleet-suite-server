-- AlterTable
ALTER TABLE "File" ADD COLUMN     "trailerId" INTEGER;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("trailerId") REFERENCES "Trailer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

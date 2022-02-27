-- AlterTable
ALTER TABLE "File" ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "File" ADD FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

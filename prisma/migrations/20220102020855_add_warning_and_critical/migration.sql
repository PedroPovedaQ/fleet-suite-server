-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "critical_advisory_days" INTEGER NOT NULL DEFAULT 7,
ADD COLUMN     "warning_advisory_days" INTEGER NOT NULL DEFAULT 30;

-- CreateIndex
CREATE INDEX "Category_type_idx" ON "Category"("type");

-- AlterTable
ALTER TABLE "Brokerage" ADD COLUMN     "remit" BOOLEAN DEFAULT false,
ADD COLUMN     "remit_city" VARCHAR,
ADD COLUMN     "remit_mailing_address" VARCHAR,
ADD COLUMN     "remit_name" VARCHAR,
ADD COLUMN     "remit_phone" VARCHAR,
ADD COLUMN     "remit_state" VARCHAR,
ADD COLUMN     "remit_zip" VARCHAR;

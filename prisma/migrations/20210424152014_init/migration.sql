-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" VARCHAR NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "driver" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "cdl_number" VARCHAR NOT NULL,
    "cdl_state" VARCHAR NOT NULL,
    "experience_years" SMALLINT NOT NULL,
    "phone" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "commentsId" INTEGER,
    "truckId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "truck" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "owned_by_company" BOOLEAN NOT NULL DEFAULT false,
    "year" SMALLINT NOT NULL,
    "make" VARCHAR NOT NULL,
    "model" VARCHAR NOT NULL,
    "color" VARCHAR NOT NULL,
    "owner_name" VARCHAR NOT NULL,
    "owner_phone" VARCHAR NOT NULL,
    "owner_email" VARCHAR NOT NULL,
    "unit_number" VARCHAR NOT NULL,
    "registration_number" VARCHAR NOT NULL,
    "vin_number" VARCHAR NOT NULL,
    "comments" TEXT[],
    "driverId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL DEFAULT E'dispatcher',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "driver.cdl_number_unique" ON "driver"("cdl_number");

-- CreateIndex
CREATE UNIQUE INDEX "driver.cdl_state_unique" ON "driver"("cdl_state");

-- CreateIndex
CREATE UNIQUE INDEX "driver.email_unique" ON "driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "driver.commentsId_unique" ON "driver"("commentsId");

-- CreateIndex
CREATE UNIQUE INDEX "driver.truckId_unique" ON "driver"("truckId");

-- CreateIndex
CREATE UNIQUE INDEX "truck.owner_email_unique" ON "truck"("owner_email");

-- CreateIndex
CREATE UNIQUE INDEX "truck.driverId_unique" ON "truck"("driverId");

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- AddForeignKey
ALTER TABLE "comment" ADD FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD FOREIGN KEY ("commentsId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "driver" ADD FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "truck" ADD FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

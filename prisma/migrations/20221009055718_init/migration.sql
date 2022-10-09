-- CreateEnum
CREATE TYPE "PriceCondition" AS ENUM ('NEGOTIABLE', 'NON_NEGOTIABLE');

-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('SEDAN', 'COUPE', 'SUV', 'PICKUP', 'TRUCK', 'VAN', 'BUS');

-- CreateEnum
CREATE TYPE "History" AS ENUM ('IMPORTED', 'PRE_OWNED');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('PRICE', 'VEHICLE', 'INFORMATION');

-- CreateTable
CREATE TABLE "Make" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Make_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "make_id" BIGINT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" BIGSERIAL NOT NULL,
    "chassis" TEXT NOT NULL,
    "model_id" BIGINT NOT NULL,
    "engine_number" TEXT NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_visible" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION,
    "submodel" TEXT,
    "price_condition" "PriceCondition" NOT NULL DEFAULT 'NEGOTIABLE',
    "mileage" INTEGER,
    "engine_size" INTEGER,
    "body" "BodyType" NOT NULL,
    "color" TEXT,
    "features" TEXT[],
    "history" "History" NOT NULL DEFAULT 'IMPORTED',

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" BIGSERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" BIGSERIAL NOT NULL,
    "client_id" BIGINT NOT NULL,
    "vehicle_id" BIGINT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "client_id" BIGINT NOT NULL,
    "vehicle_id" BIGINT NOT NULL,
    "comment" TEXT NOT NULL,
    "type" "RequestType" NOT NULL DEFAULT 'INFORMATION',

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Make_name_key" ON "Make"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_chassis_key" ON "Vehicle"("chassis");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_engine_number_key" ON "Vehicle"("engine_number");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_make_id_fkey" FOREIGN KEY ("make_id") REFERENCES "Make"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

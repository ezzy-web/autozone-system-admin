/*
  Warnings:

  - You are about to drop the column `features` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "mobile" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "comment" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "features";

-- CreateTable
CREATE TABLE "Feature" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "vehicleId" BIGINT,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;

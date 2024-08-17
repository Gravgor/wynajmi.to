/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "coordinates",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

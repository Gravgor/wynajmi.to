-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "bedrooms" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;

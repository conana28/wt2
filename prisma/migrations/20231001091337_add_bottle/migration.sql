-- AlterTable
ALTER TABLE "Wine" ADD COLUMN     "type" TEXT,
ALTER COLUMN "subRegion" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Bottle" (
    "id" SERIAL NOT NULL,
    "vintage" INTEGER NOT NULL DEFAULT 0,
    "rack" TEXT NOT NULL,
    "shelf" TEXT,
    "cost" DECIMAL(65,30),
    "consume" TIMESTAMP(3),
    "occasion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "wineId" INTEGER NOT NULL,

    CONSTRAINT "Bottle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bottle" ADD CONSTRAINT "Bottle_wineId_fkey" FOREIGN KEY ("wineId") REFERENCES "Wine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

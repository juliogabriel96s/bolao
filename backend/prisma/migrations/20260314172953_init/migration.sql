/*
  Warnings:

  - You are about to drop the column `championshipId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `roundId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_championshipId_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "championshipId",
ADD COLUMN     "roundId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

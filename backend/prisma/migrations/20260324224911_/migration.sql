/*
  Warnings:

  - You are about to drop the column `paid` on the `Bet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bet" DROP COLUMN "paid";

-- AlterTable
ALTER TABLE "Round" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3);

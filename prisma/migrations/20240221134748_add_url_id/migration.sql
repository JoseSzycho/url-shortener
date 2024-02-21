/*
  Warnings:

  - Added the required column `urlId` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Link_id_idx";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "urlId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Link_id_urlId_idx" ON "Link"("id", "urlId");

/*
  Warnings:

  - A unique constraint covering the columns `[urlId]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Link_urlId_key" ON "Link"("urlId");

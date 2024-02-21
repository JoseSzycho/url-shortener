-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkView" (
    "id" TEXT NOT NULL,
    "viewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isMovile" BOOLEAN NOT NULL,
    "linkId" TEXT NOT NULL,

    CONSTRAINT "LinkView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Link_id_idx" ON "Link"("id");

-- AddForeignKey
ALTER TABLE "LinkView" ADD CONSTRAINT "LinkView_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

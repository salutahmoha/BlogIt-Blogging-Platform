/*
  Warnings:

  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_owner_fkey";

-- DropTable
DROP TABLE "Blog";

-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_owner_fkey" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

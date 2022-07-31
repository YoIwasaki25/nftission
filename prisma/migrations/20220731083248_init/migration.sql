/*
  Warnings:

  - You are about to drop the column `oauth_tokenq` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_articleId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "oauth_tokenq",
ADD COLUMN     "oauth_token" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "articleId",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "_ArticleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArticleToUser_AB_unique" ON "_ArticleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ArticleToUser_B_index" ON "_ArticleToUser"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToUser" ADD CONSTRAINT "_ArticleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToUser" ADD CONSTRAINT "_ArticleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

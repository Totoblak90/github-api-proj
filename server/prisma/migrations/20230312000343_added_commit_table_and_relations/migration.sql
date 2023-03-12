/*
  Warnings:

  - You are about to drop the `Repository` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Repository";

-- CreateTable
CREATE TABLE "repositories" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "repo_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "route" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,

    CONSTRAINT "repositories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commits" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "commit_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "redirect_url" TEXT NOT NULL,
    "repo_id" INTEGER NOT NULL,

    CONSTRAINT "commits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "repositories_repo_id_key" ON "repositories"("repo_id");

-- CreateIndex
CREATE UNIQUE INDEX "commits_commit_id_key" ON "commits"("commit_id");

-- CreateIndex
CREATE UNIQUE INDEX "commits_repo_id_key" ON "commits"("repo_id");

-- AddForeignKey
ALTER TABLE "commits" ADD CONSTRAINT "commits_repo_id_fkey" FOREIGN KEY ("repo_id") REFERENCES "repositories"("repo_id") ON DELETE RESTRICT ON UPDATE CASCADE;

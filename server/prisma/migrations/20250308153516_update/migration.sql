/*
  Warnings:

  - Added the required column `fullName` to the `Alumni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alumni" ADD COLUMN     "fullName" TEXT NOT NULL;

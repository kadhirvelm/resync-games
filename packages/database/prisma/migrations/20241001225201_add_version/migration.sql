/*
  Warnings:

  - Added the required column `version` to the `GameState` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameState" ADD COLUMN     "version" TEXT NOT NULL;

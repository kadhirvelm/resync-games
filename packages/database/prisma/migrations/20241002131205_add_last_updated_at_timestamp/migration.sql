-- AlterTable
ALTER TABLE "GameState" ADD COLUMN     "last_update_timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

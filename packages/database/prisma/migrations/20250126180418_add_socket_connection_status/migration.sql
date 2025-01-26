-- CreateEnum
CREATE TYPE "ConnectionStatus" AS ENUM ('connected', 'disconnected');

-- AlterTable
ALTER TABLE "PlayersInGame" ADD COLUMN     "connection_status" "ConnectionStatus" NOT NULL DEFAULT 'connected';

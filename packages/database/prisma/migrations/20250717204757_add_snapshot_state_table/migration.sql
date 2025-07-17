-- CreateTable
CREATE TABLE "SnapshotState" (
    "snapshot_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "game_slice" JSONB NOT NULL,
    "game_type" TEXT NOT NULL,
    "local_slice" JSONB NOT NULL,
    "player_slice" JSONB NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SnapshotState_pkey" PRIMARY KEY ("snapshot_id")
);

-- CreateTable
CREATE TABLE "GameState" (
    "game_id" TEXT NOT NULL,
    "game_state" JSONB NOT NULL,
    "game_configuration" JSONB NOT NULL,
    "current_game_state" TEXT NOT NULL,
    "game_type" TEXT NOT NULL,

    CONSTRAINT "GameState_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "Player" (
    "player_id" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("player_id")
);

-- CreateTable
CREATE TABLE "_GameStateToPlayer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameStateToPlayer_AB_unique" ON "_GameStateToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_GameStateToPlayer_B_index" ON "_GameStateToPlayer"("B");

-- AddForeignKey
ALTER TABLE "_GameStateToPlayer" ADD CONSTRAINT "_GameStateToPlayer_A_fkey" FOREIGN KEY ("A") REFERENCES "GameState"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameStateToPlayer" ADD CONSTRAINT "_GameStateToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("player_id") ON DELETE CASCADE ON UPDATE CASCADE;

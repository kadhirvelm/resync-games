import { Module } from "@nestjs/common";
import { ResyncGamesPrismaModule } from "../database/resyncGamesPrisma.module";
import { SnapshotStateController } from "./snapshotState.controller";
import { SnapshotStateService } from "./snapshotState.service";
import { GameStateModule } from "../gameState/gameState.module";

@Module({
  controllers: [SnapshotStateController],
  exports: [SnapshotStateService],
  imports: [ResyncGamesPrismaModule, GameStateModule],
  providers: [SnapshotStateService]
})
export class SnapshotStateModule {}

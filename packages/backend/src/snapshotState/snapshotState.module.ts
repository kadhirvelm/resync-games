import { Module } from "@nestjs/common";
import { ResyncGamesPrismaModule } from "../database/resyncGamesPrisma.module";
import { SnapshotStateController } from "./snapshotState.controller";
import { SnapshotStateService } from "./snapshotState.service";

@Module({
  controllers: [SnapshotStateController],
  exports: [SnapshotStateService],
  imports: [ResyncGamesPrismaModule],
  providers: [SnapshotStateService]
})
export class SnapshotStateModule {}

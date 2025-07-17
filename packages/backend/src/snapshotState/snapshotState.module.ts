import { Module } from "@nestjs/common";
import { SnapshotStateController } from "./snapshotState.controller";
import { SnapshotStateService } from "./snapshotState.service";
import { ResyncGamesPrismaModule } from "../database/resyncGamesPrisma.module";

@Module({
  controllers: [SnapshotStateController],
  exports: [SnapshotStateService],
  imports: [ResyncGamesPrismaModule],
  providers: [SnapshotStateService]
})
export class SnapshotStateModule {}

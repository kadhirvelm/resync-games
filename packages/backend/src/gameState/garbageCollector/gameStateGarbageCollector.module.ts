import { Module } from "@nestjs/common";
import { GameStateGarbageCollector } from "./gameStateGarbageCollector.service";
import { ResyncGamesPrismaModule } from "@/database/resyncGamesPrisma.module";

@Module({
  imports: [ResyncGamesPrismaModule],
  providers: [GameStateGarbageCollector]
})
export class GameStateGarbageCollectionModule {}

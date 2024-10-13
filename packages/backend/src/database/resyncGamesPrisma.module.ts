import { Module } from "@nestjs/common";
import { ResyncGamesConverterService } from "./resyncGamesPrismaConverter.service";
import { ResyncGamesPrismaService } from "./resyncGamesPrisma.service";

@Module({
  exports: [ResyncGamesPrismaService],
  providers: [ResyncGamesPrismaService, ResyncGamesConverterService]
})
export class ResyncGamesPrismaModule {}

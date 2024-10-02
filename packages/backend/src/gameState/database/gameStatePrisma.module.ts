import { Module } from "@nestjs/common";
import { GameStateConverterService } from "./gameStateConverter.service";
import { GameStatePrismaService } from "./gameStatePrisma.service";

@Module({
  exports: [GameStatePrismaService],
  providers: [GameStatePrismaService, GameStateConverterService]
})
export class GameStatePrismaModule {}

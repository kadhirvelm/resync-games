import { Body, Controller } from "@nestjs/common";
import {
  CreateGame,
  GameStateApi,
  GameStateServiceDefinition,
  GetGameState,
  JoinGame,
  LeaveGame,
  UpdateGame
} from "@resync-games/api";
import {
  ServiceControllerInterface,
  getDecorator
} from "src/genericTypes/controller";
import { GameStateService } from "./gameState.service";

@Controller(GameStateServiceDefinition.controller)
export class GameStateController
  implements ServiceControllerInterface<GameStateApi>
{
  constructor(private readonly gameStateService: GameStateService) {}

  @getDecorator(GameStateServiceDefinition.endpoints.createGame)
  public async createGame(@Body() request: CreateGame) {
    return this.gameStateService.createGame(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.getAvailableGames)
  public async getAvailableGames() {
    return this.gameStateService.getAvailableGames();
  }

  @getDecorator(GameStateServiceDefinition.endpoints.getGameState)
  public async getGameState(@Body() request: GetGameState) {
    return this.gameStateService.getGameState(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.joinGame)
  public async joinGame(@Body() request: JoinGame) {
    return this.gameStateService.joinGame(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.leaveGame)
  public async leaveGame(@Body() request: LeaveGame) {
    return this.gameStateService.leaveGame(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.updateGame)
  public async updateGame(@Body() request: UpdateGame) {
    return this.gameStateService.updateGame(request);
  }
}

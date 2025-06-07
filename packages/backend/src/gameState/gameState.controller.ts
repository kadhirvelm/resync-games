import { Body, Controller } from "@nestjs/common";
import {
  ChangeGameState,
  CreateGame,
  GameStateApi,
  GameStateServiceDefinition,
  GetGameState,
  GetGlobalScreenUrl,
  JoinGameWithCode,
  LeaveGame,
  UpdateGame,
  UpdateGameConfiguration,
  UpdatePlayerInGame
} from "@/imports/api";
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

  @getDecorator(GameStateServiceDefinition.endpoints.changeGameState)
  public async changeGameState(@Body() request: ChangeGameState) {
    return this.gameStateService.changeGameState(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.createGame)
  public async createGame(@Body() request: CreateGame) {
    return this.gameStateService.createGame(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.getGameState)
  public async getGameState(@Body() request: GetGameState) {
    return this.gameStateService.getGameState(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.joinGame)
  public async joinGame(@Body() request: JoinGameWithCode) {
    return this.gameStateService.joinGameWithCode(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.getGlobalScreenUrl)
  public async getGlobalScreenUrl(@Body() request: GetGlobalScreenUrl) {
    return this.gameStateService.getGlobalScreenUrl(request.inviteCode);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.leaveGame)
  public async leaveGame(@Body() request: LeaveGame) {
    return this.gameStateService.leaveGame(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.updateGame)
  public async updateGame(@Body() request: UpdateGame) {
    return this.gameStateService.updateGame(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.updateGameConfiguration)
  public async updateGameConfiguration(
    @Body() request: UpdateGameConfiguration
  ) {
    return this.gameStateService.updateGameConfiguration(request);
  }

  @getDecorator(GameStateServiceDefinition.endpoints.updatePlayerInGame)
  public async updatePlayerInGame(@Body() request: UpdatePlayerInGame) {
    return this.gameStateService.updatePlayerInGame(request);
  }
}

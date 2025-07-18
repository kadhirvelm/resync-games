import { Body, Controller } from "@nestjs/common";
import {
  SnapshotState,
  SnapshotStateApi,
  SnapshotStateDisplay,
  SnapshotStateServiceDefinition
} from "@/imports/api";
import {
  ServiceControllerInterface,
  getDecorator
} from "../genericTypes/controller";
import { SnapshotStateService } from "./snapshotState.service";

@Controller(SnapshotStateServiceDefinition.controller)
export class SnapshotStateController
  implements ServiceControllerInterface<SnapshotStateApi>
{
  constructor(private readonly snapshotStateService: SnapshotStateService) {}

  @getDecorator(SnapshotStateServiceDefinition.endpoints.snapshotState)
  public async snapshotState(@Body() request: SnapshotState) {
    return this.snapshotStateService.snapshotState(request);
  }

  @getDecorator(SnapshotStateServiceDefinition.endpoints.getSnapshotStates)
  public async getSnapshotStates(@Body() _request: Record<string, never>) {
    return this.snapshotStateService.getSnapshotStates();
  }

  @getDecorator(
    SnapshotStateServiceDefinition.endpoints.initiateGameFromSnapshot
  )
  public async initiateGameFromSnapshot(@Body() request: SnapshotStateDisplay) {
    return this.snapshotStateService.initiateGameFromSnapshot(request);
  }
}

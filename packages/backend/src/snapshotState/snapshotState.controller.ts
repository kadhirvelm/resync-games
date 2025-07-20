import {
  DeleteSnapshotStateRequest,
  ResetGameToSnapshotRequest,
  SnapshotState,
  SnapshotStateApi,
  SnapshotStateDisplay,
  SnapshotStateServiceDefinition,
  UpdateSnapshotStatRequest
} from "@/imports/api";
import { Body, Controller } from "@nestjs/common";
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

  @getDecorator(SnapshotStateServiceDefinition.endpoints.resetGameToSnapshot)
  public async resetGameToSnapshot(
    @Body() request: ResetGameToSnapshotRequest
  ) {
    return this.snapshotStateService.resetGameToSnapshot(request);
  }

  @getDecorator(SnapshotStateServiceDefinition.endpoints.updateSnapshotState)
  public async updateSnapshotState(@Body() request: UpdateSnapshotStatRequest) {
    return this.snapshotStateService.updateSnapshotState(request);
  }

  @getDecorator(SnapshotStateServiceDefinition.endpoints.deleteSnapshotState)
  public async deleteSnapshotState(
    @Body() request: DeleteSnapshotStateRequest
  ) {
    await this.snapshotStateService.deleteSnapshotState(request.snapshotId);

    return {};
  }
}

export type FieldListener = (newVaue: unknown) => void;

export interface IGameStateStore {
  subscribeToField(path: string, callback: FieldListener): void;
  updateGameState(newState: object): void;
}

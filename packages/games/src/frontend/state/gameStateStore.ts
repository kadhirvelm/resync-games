export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

export type FieldListener = (newVaue: unknown) => void;

export interface IGameStateStore<GameState extends object> {
  subscribeToField(path: string, callback: FieldListener): void;
  updateGameState(newState: RecursivePartial<GameState>): void;
}
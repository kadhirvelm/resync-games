export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

export type FieldListener = (newValue: unknown) => void;

export interface IGameStateStore<GameState extends object> {
  dispatch(stateUpdate: RecursivePartial<GameState>): void;
  subscribeToField(path: string, listener: FieldListener): void;
}

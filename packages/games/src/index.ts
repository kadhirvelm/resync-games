export const IMPLEMENTED_GAMES = ["snatch-the-snack"] as const;
export type ImplementedGameType = (typeof IMPLEMENTED_GAMES)[number];

export * from "./gameStateTypes";

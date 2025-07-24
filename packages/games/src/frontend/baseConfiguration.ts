/**
 * The base game configuration object. This will be used to map the backend configuration onto a frontend
 */
export interface BaseGameConfigurationField {
  default?: unknown;
  label: string;
  order?: number;
  required: boolean;
  type: string;
}

/**
 * A number field - used for number input.
 */
export interface GameConfigurationFieldNumber
  extends BaseGameConfigurationField {
  default?: number;
  defaultChange?: number;
  divisibleBy?: number;
  max?: number;
  min?: number;
  type: "number";
}

/**
 * A string field - used for text input.
 */
export interface GameConfigurationFieldString
  extends BaseGameConfigurationField {
  default?: string;
  placeholder?: string;
  type: "string";
}

export interface GameConfigurationFieldRoundTimer
  extends BaseGameConfigurationField {
  default: { [roundNumber: number]: number };
  totalRoundsKey: string;
  type: "round-timer";
}

export interface GameConfigurationNoopField extends BaseGameConfigurationField {
  default: object | string | number;
  type: "noop";
}

/**
 * A field in the game configuration. It will create an object with [key]: field value.
 */
export type GameConfigurationField =
  | GameConfigurationFieldNumber
  | GameConfigurationFieldString
  | GameConfigurationFieldRoundTimer
  | GameConfigurationNoopField;

/**
 * The game configuration object interface. This will be used to map the backend configuration onto a frontend
 * configuration object the user can interact with.
 */
export type MapGameConfiguration<GameConfiguration> = {
  [Key in keyof GameConfiguration]: GameConfigurationField;
};

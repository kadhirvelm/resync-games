/**
 * The base game configuration object. This will be used to map the backend configuration onto a frontend
 */
export interface BaseGameConfigurationField {
  label: string;
  required: boolean;
  type: string;
}

/**
 * A number field - used for number input.
 */
export interface GameConfigurationFieldNumber
  extends BaseGameConfigurationField {
  default?: number;
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

/**
 * A field in the game configuration. It will create an object with [key]: field value.
 */
export type GameConfigurationField =
  | GameConfigurationFieldNumber
  | GameConfigurationFieldString;

/**
 * The game configuration object interface. This will be used to map the backend configuration onto a frontend
 * configuration object the user can interact with.
 */
export type MapGameConfiguration<GameConfiguration> = {
  [Key in keyof GameConfiguration]: GameConfigurationField;
};

export interface BaseGameConfigurationField {
  required: boolean;
  type: string;
}

/**
 * A string field - used for text input.
 */
export interface GameConfigurationFieldString
  extends BaseGameConfigurationField {
  default?: string;
  label?: string;
  placeholder?: string;
  type: "string";
}

/**
 * A field in the game configuration. It will create an object with [key]: field value.
 */
export type GameConfigurationField = GameConfigurationFieldString;

/**
 * The game configuration object interface. This will be used to map the backend configuration onto a frontend
 * configuration object the user can interact with.
 */
export type MapGameConfiguration<GameConfiguration> = {
  [Key in keyof GameConfiguration]: GameConfiguration[Key];
};

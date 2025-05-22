import { PlayerContext } from "@/components/player/PlayerContext";
import { isServiceError } from "@/imports/api";
import {
  GameConfigurationField,
  GameConfigurationFieldNumber,
  GameConfigurationFieldString
} from "@/imports/games";
import { DisplayText } from "@/lib/radix";
import { Flex } from "@/lib/radix/Flex";
import { TextField } from "@/lib/radix/TextField";
import { NumberInput } from "@/lib/resync-components/NumberInput";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { useGameStateSelector } from "@/redux";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { useContext, useState } from "react";

export const ConfigureGame = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const player = useContext(PlayerContext);

  // We rely on key based rendering to update the game configuration when someone else updates the config
  const [currentGameConfiguration, setCurrentGameConfiguration] = useState(
    gameInfo?.gameConfiguration ?? {}
  );

  if (gameInfo === undefined) {
    return;
  }

  const accordingGame = getFrontendGame(gameInfo.gameType);

  const onSaveConfiguration = async (optionalNewGameConfiguration?: object) => {
    if (gameInfo === undefined) {
      return;
    }

    const maybeNewState =
      await ClientServiceCallers.gameState.updateGameConfiguration({
        gameConfiguration:
          optionalNewGameConfiguration ?? currentGameConfiguration,
        gameId: gameInfo.gameId,
        gameType: gameInfo.gameType,
        lastUpdatedAt: gameInfo.lastUpdatedAt,
        playerId: player.playerId
      });

    if (isServiceError(maybeNewState)) {
      console.error(maybeNewState);
      return;
    }

    setCurrentGameConfiguration(maybeNewState.gameConfiguration);
  };

  const renderNumberField = (
    key: string,
    currentValue: string | number | boolean | undefined | null,
    configurationValue: GameConfigurationFieldNumber
  ) => {
    return (
      <Flex direction="column" gap="1" key={key}>
        <DisplayText>
          {configurationValue.label}
          {configurationValue.required ? "*" : ""}
        </DisplayText>
        <NumberInput
          defaultChange={configurationValue.defaultChange}
          divisibleBy={configurationValue.divisibleBy}
          maximum={configurationValue.max}
          minimum={configurationValue.min}
          onChange={(newValue) =>
            onSaveConfiguration({
              ...currentGameConfiguration,
              [key]: newValue
            })
          }
          value={currentValue?.toString() ?? ""}
        />
      </Flex>
    );
  };

  const renderStringField = (
    key: string,
    currentValue: string | undefined | null,
    configurationValue: GameConfigurationFieldString
  ) => {
    return (
      <Flex direction="column" gap="1" key={key}>
        <DisplayText>
          {configurationValue.label}
          {configurationValue.required ? "*" : ""}
        </DisplayText>
        <TextField
          onBlur={onSaveConfiguration}
          onChange={(newValue) =>
            setCurrentGameConfiguration({
              ...currentGameConfiguration,
              [key]: newValue
            })
          }
          placeholder={configurationValue.placeholder}
          value={currentValue ?? ""}
        />
      </Flex>
    );
  };

  const renderField = (
    key: string,
    configurationValue: GameConfigurationField
  ) => {
    const currentValue =
      currentGameConfiguration[key as keyof typeof currentGameConfiguration];

    if (configurationValue.type === "number") {
      return renderNumberField(key, currentValue, configurationValue);
    }

    if (configurationValue.type === "string") {
      return renderStringField(key, currentValue, configurationValue);
    }
  };

  return (
    <Flex direction="column" gap="2">
      {Object.entries(accordingGame.gameConfiguration).map(
        ([key, configurationValue]: [string, GameConfigurationField]) =>
          renderField(key, configurationValue)
      )}
    </Flex>
  );
};

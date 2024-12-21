import { PlayerContext } from "@/components/player/PlayerContext";
import { Flex } from "@/lib/radix/Flex";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { useGameStateSelector } from "@/redux";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { isServiceError } from "@resync-games/api";
import {
  GameConfigurationField,
  GameConfigurationFieldNumber,
  GameConfigurationFieldString
} from "@resync-games/games/baseConfiguration";
import { useContext, useState } from "react";
import { Text } from "@radix-ui/themes";
import { TextField } from "@/lib/radix/TextField";

export const ConfigureGame = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const player = useContext(PlayerContext);

  const [currentGameConfiguration, setCurrentGameConfiguration] = useState(
    gameInfo?.gameConfiguration ?? {}
  );

  if (gameInfo === undefined) {
    return;
  }

  const accordingGame = getFrontendGame(gameInfo.gameType);

  const onSaveConfiguration = async () => {
    if (gameInfo === undefined) {
      return;
    }

    const maybeNewState =
      await ClientServiceCallers.gameState.updateGameConfiguration({
        gameConfiguration: currentGameConfiguration,
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
        <Text>
          {configurationValue.label}
          {configurationValue.required ? "*" : ""}
        </Text>
        <TextField
          onBlur={onSaveConfiguration}
          onChange={(newValue) =>
            setCurrentGameConfiguration({
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
        <Text>
          {configurationValue.label}
          {configurationValue.required ? "*" : ""}
        </Text>
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

    return renderStringField(key, currentValue, configurationValue);
  };

  return (
    <Flex direction="column">
      {Object.entries(accordingGame.gameConfiguration).map(
        ([key, configurationValue]: [string, GameConfigurationField]) =>
          renderField(key, configurationValue)
      )}
    </Flex>
  );
};

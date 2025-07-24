import { PlayerContext } from "@/components/player/PlayerContext";
import { isServiceError } from "@/imports/api";
import {
  GameConfigurationField,
  GameConfigurationFieldNumber,
  GameConfigurationFieldRoundTimer,
  GameConfigurationFieldString
} from "@/imports/games";
import { DisplayText } from "@/lib/radix";
import { Flex } from "@/lib/radix/Flex";
import { TextField } from "@/lib/radix/TextField";
import { NumberInput } from "@/lib/resync-components/NumberInput";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { useGameStateSelector } from "@/redux";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { range } from "lodash-es";
import { JSX, useContext, useState } from "react";

export const ConfigureGame = () => {
  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const { player } = useContext(PlayerContext);

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

  const renderRoundTimerField = (
    key: string,
    currentValue: string | number | boolean | undefined | null,
    configurationValue: GameConfigurationFieldRoundTimer
  ) => {
    const totalRounds =
      currentGameConfiguration[
        configurationValue.totalRoundsKey as keyof typeof currentGameConfiguration
      ];

    if (typeof totalRounds !== "number") {
      return (
        <DisplayText color="red" key={key} size="2">
          Something went wrong with {key}
        </DisplayText>
      );
    }

    if (totalRounds === 0) {
      return (
        <DisplayText key={key} size="2">
          No rounds
        </DisplayText>
      );
    }

    return (
      <Flex direction="column" gap="2" key={key}>
        <DisplayText>{configurationValue.label}</DisplayText>
        {range(1, totalRounds + 1).map((round) => {
          const roundTimer =
            currentValue?.[round as unknown as keyof typeof currentValue] ??
            configurationValue.default[round];

          if (typeof roundTimer !== "number") {
            return (
              <DisplayText color="red" size="2">
                Something went wrong with {key} at round {round}
              </DisplayText>
            );
          }

          return (
            <Flex align="center" gap="1" key={round}>
              <DisplayText color="gray" size="2">
                R{round}
              </DisplayText>
              <NumberInput
                onChange={(newValue) =>
                  onSaveConfiguration({
                    ...currentGameConfiguration,
                    [key]: newValue
                  })
                }
                value={roundTimer}
              />
              <DisplayText color="gray" size="2">
                (s)
              </DisplayText>
            </Flex>
          );
        })}
      </Flex>
    );
  };

  // TODO: make each field a component
  const renderField = (
    key: string,
    configurationValue: GameConfigurationField
  ): JSX.Element | null => {
    const currentValue =
      currentGameConfiguration[key as keyof typeof currentGameConfiguration];

    switch (configurationValue.type) {
      case "noop":
        return null;
      case "round-timer":
        return renderRoundTimerField(key, currentValue, configurationValue);
      case "number":
        return renderNumberField(key, currentValue, configurationValue);
      case "string":
        return renderStringField(key, currentValue, configurationValue);
    }
  };

  return (
    <Flex direction="column" gap="3">
      {Object.entries(accordingGame.gameConfiguration)
        .sort((a, b) => a[1].order - b[1].order)
        .map(([key, configurationValue]: [string, GameConfigurationField]) =>
          renderField(key, configurationValue)
        )}
    </Flex>
  );
};

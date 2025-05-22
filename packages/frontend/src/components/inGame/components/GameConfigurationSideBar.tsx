import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { DisplayText, Flex } from "@/lib/radix";
import { useGameStateSelector } from "@/redux";
import { GAME_REGISTRY } from "@/imports/games-shared";
import copy from "copy-to-clipboard";
import { CopyIcon, SettingsIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ConfigureGame } from "./ConfigureGame";
import styles from "./GameConfigurationSideBar.module.scss";
import { TutorialScreen } from "./TutorialScreen";
import { toast } from "react-toastify";
import { getFrontendGame } from "@/lib/utils/getFrontendGame";
import { GameInfo } from "@/imports/api";
import { GAME_SLUGS } from "@/imports/games-shared";

export const GameConfigurationSideBar = () => {
  const { isMobile } = useMediaQuery();

  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const maybeRenderGlobalScreen = (gameInformation: GameInfo<object>) => {
    const frontend = getFrontendGame(gameInformation.gameType);
    if (frontend.globalScreen === undefined) {
      return;
    }

    const copyGlobalScreen = () => {
      copy(`${window.location.href}/global`);
      toast("Copied to clipboard", { autoClose: 2000, type: "success" });
    };

    return (
      <Flex
        align="center"
        className={styles.inviteLink}
        gap="3"
        onClick={copyGlobalScreen}
      >
        <DisplayText>Global screen</DisplayText>
        <CopyIcon size={16} />
      </Flex>
    );
  };

  const renderRoomName = () => {
    if (gameInfo === undefined) {
      return;
    }

    const gameSlug = gameInfo.gameType as (typeof GAME_SLUGS)[number];

    return (
      <Flex direction="column" gap="1">
        <Flex direction="column">
          <Flex align="center" gap="2">
            <DisplayText size="5" weight="bold">
              {gameInfo.inviteCode.toUpperCase()}
            </DisplayText>
          </Flex>
        </Flex>
        {maybeRenderGlobalScreen(gameInfo)}
        <Flex mt="2">{GAME_REGISTRY[gameSlug]?.name}</Flex>
      </Flex>
    );
  };

  const maybeRenderContent = () => {
    if (isCollapsed) {
      return;
    }

    return (
      <motion.div
        animate={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
      >
        <Flex direction="column" flex="1" gap="1" mt="7" p="3">
          {renderRoomName()}
          <TutorialScreen key={gameInfo?.gameId + "tutorial"} />
          <Flex direction="column" gap="1" mt="4">
            <DisplayText color="gray" size="2">
              Game configuration
            </DisplayText>
            <ConfigureGame key={JSON.stringify(gameInfo?.gameConfiguration)} />
          </Flex>
        </Flex>
      </motion.div>
    );
  };

  const maybeExpand = () => {
    if (!isCollapsed || !isMobile) {
      return;
    }

    setIsCollapsed(false);
  };

  const renderSideBar = () => {
    if (isMobile && isCollapsed) {
      return;
    }

    return (
      <Flex
        className={styles.configuration}
        direction="column"
        flex="1"
        onClick={maybeExpand}
        p="3"
      >
        {maybeRenderContent()}
      </Flex>
    );
  };

  return (
    <>
      {!isCollapsed && isMobile && (
        <Flex className={styles.overlay} onClick={() => setIsCollapsed(true)} />
      )}
      {isMobile && (
        <Flex className={styles.mobileCollapsed} onClick={maybeExpand} p="2">
          <SettingsIcon size={16} />
        </Flex>
      )}
      {renderSideBar()}
    </>
  );
};

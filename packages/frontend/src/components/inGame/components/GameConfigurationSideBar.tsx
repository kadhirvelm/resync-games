import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Flex } from "@/lib/radix";
import { useGameStateSelector } from "@/redux";
import { Text } from "@radix-ui/themes";
import {
  GAME_REGISTRY,
  GAME_SLUGS
} from "@resync-games/games-shared/gamesRegistry";
import copy from "copy-to-clipboard";
import { CopyIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ConfigureGame } from "./ConfigureGame";
import styles from "./GameConfigurationSideBar.module.scss";
import { TutorialScreen } from "./TutorialScreen";
import { toast } from "react-toastify";

export const GameConfigurationSideBar = () => {
  const { isMobile } = useMediaQuery();

  const { gameInfo } = useGameStateSelector((s) => s.gameStateSlice);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const renderRoomName = () => {
    if (gameInfo === undefined) {
      return;
    }

    const copyGlobalScreen = () => {
      copy(`${window.location.href}/global`);
      toast("Copied to clipboard", { autoClose: 2000, type: "success" });
    };

    const gameSlug = gameInfo.gameType as (typeof GAME_SLUGS)[number];

    return (
      <Flex direction="column" gap="1">
        <Flex direction="column">
          <Flex align="center" gap="2">
            <Text size="5" weight="bold">
              {gameInfo.inviteCode.toUpperCase()}
            </Text>
          </Flex>
        </Flex>
        <Flex
          align="center"
          className={styles.inviteLink}
          gap="3"
          onClick={copyGlobalScreen}
        >
          <Text>Global screen</Text>
          <CopyIcon size={16} />
        </Flex>
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
            <Text color="gray" size="2">
              Game configuration
            </Text>
            <ConfigureGame key={gameInfo?.gameId + "configure"} />
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

  return (
    <>
      {!isCollapsed && isMobile && (
        <Flex className={styles.overlay} onClick={() => setIsCollapsed(true)} />
      )}
      <Flex
        className={styles.configuration}
        direction="column"
        flex="1"
        onClick={maybeExpand}
        p="3"
      >
        {maybeRenderContent()}
      </Flex>
    </>
  );
};

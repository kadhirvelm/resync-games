import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Flex } from "@/lib/radix";
import { useGameStateSelector } from "@/redux";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import copy from "copy-to-clipboard";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ConfigureGame } from "./ConfigureGame";
import styles from "./GameConfigurationSideBar.module.scss";
import { TutorialScreen } from "./TutorialScreen";

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

    const { gameName } = gameInfo;

    const copyGameLink = () => copy(window.location.href);
    const openGlobalScreen = () =>
      window.open(`${window.location.href}/global`, "_blank");

    return (
      <Flex direction="column" gap="3">
        <Flex align="center">
          <Text size="8" weight="bold">
            {gameName}
          </Text>
        </Flex>
        <Flex
          align="center"
          className={styles.inviteLink}
          gap="3"
          onClick={copyGameLink}
        >
          <Text>Invite link</Text>
          <ClipboardCopyIcon />
        </Flex>
        <Flex
          align="center"
          className={styles.inviteLink}
          gap="3"
          onClick={openGlobalScreen}
        >
          <Text
            onClick={() =>
              window.open(`${window.location.href}/global`, "_blank")
            }
          >
            Global screen
          </Text>
          <OpenInNewWindowIcon />
        </Flex>
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
        <Flex direction="column" flex="1" gap="4" mt="7" p="3">
          {renderRoomName()}
          <TutorialScreen key={gameInfo?.gameId + "tutorial"} />
          <Flex direction="column" gap="4">
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

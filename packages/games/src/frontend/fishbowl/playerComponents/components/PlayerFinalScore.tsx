import { DisplayText, Flex } from "@/lib/radix";
import { Scoreboard } from "./finalScore/Scoreboard";
import { selectTeamWithNames } from "../../../shared/globalSelectors";
import { useFishbowlSelector } from "../../store/fishbowlRedux";
import { useState } from "react";
import { motion } from "motion/react";
import styles from "./PlayerFinalScore.module.scss";
import clsx from "clsx";
import { PlayerContributions } from "./finalScore/PlayerContributions";

export const PlayerFinalScore = () => {
  const teamNames = useFishbowlSelector(selectTeamWithNames);

  const [viewingTab, setViewingTab] = useState<
    "scoreboard" | "player-contributions"
  >("scoreboard");

  return (
    <Flex align="center" direction="column" flex="1" gap="4" justify="center">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ delay: (Object.keys(teamNames ?? {}).length ?? 0) + 1 }}
      >
        <Flex align="center" gap="3">
          <Flex
            className={clsx(
              styles.tab,
              viewingTab === "scoreboard" && styles.active
            )}
            onClick={() => setViewingTab("scoreboard")}
          >
            <DisplayText>Scoreboard</DisplayText>
          </Flex>
          <Flex
            className={clsx(
              styles.tab,
              viewingTab === "player-contributions" && styles.active
            )}
            onClick={() => setViewingTab("player-contributions")}
          >
            <DisplayText>Words</DisplayText>
          </Flex>
        </Flex>
      </motion.div>
      {viewingTab === "scoreboard" && <Scoreboard />}
      {viewingTab === "player-contributions" && <PlayerContributions />}
    </Flex>
  );
};

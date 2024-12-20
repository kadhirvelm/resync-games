import { useContext } from "react";
import { useGameStateSelector } from "../store/theStockTimesRedux";
import { PlayerContext } from "@/components/player/PlayerContext";
import { Flex } from "@/lib/radix/Flex";
import styles from "./PlayerPortfolio.module.scss";

export const PlayerPortfolio = () => {
  const player = useContext(PlayerContext);
  const playerPortfolio = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.players[player.playerId]
  );

  console.log(playerPortfolio);

  return (
    <Flex className={styles.portfolioContainer}>Player portfolio here</Flex>
  );
};

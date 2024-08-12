import { TilePawn } from "@tiles-tbd/api";
import styles from "./DisplayPawn.module.scss";
import { Box } from "grommet";

export function DisplayPawn({ pawn }: { pawn: TilePawn }) {
  return (
    <Box className={styles.pawn} style={{ backgroundColor: pawn.color }} />
  );
}

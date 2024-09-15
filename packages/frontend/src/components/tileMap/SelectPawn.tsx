import { useTileDispatch, useTileSelector } from "@/stores/tiles/tilesStore";
import { TilePawn } from "@tiles-tbd/api";
import { Text } from "@radix-ui/themes";
import styles from "./SelectPawn.module.scss";
import { setSelectedPawn } from "@/stores/tiles/pawnState";
import { capitalize } from "lodash-es";
import { Flex } from "@/lib/radix/Flex";
import { Crosshair1Icon } from "@radix-ui/react-icons";
import clsx from "clsx";

export const SelectPawn = () => {
  const dispatch = useTileDispatch();

  const { selectedPawnId, pawnState } = useTileSelector(
    (state) => state.pawnState
  );

  const availablePawns = Object.values(pawnState);

  const renderSinglePawn = (pawn: TilePawn) => {
    const isSelected = selectedPawnId === pawn.tilePawnId;

    const selectPawn = () =>
      dispatch(setSelectedPawn(isSelected ? undefined : pawn.tilePawnId));

    return (
      <Flex align="center" gap="2" key={pawn.tilePawnId} onClick={selectPawn}>
        <Flex
          align="center"
          className={clsx(styles.pawnSelector, {
            [styles.red ?? ""]: pawn.color === "red",
            [styles.yellow ?? ""]: pawn.color === "yellow",
            [styles.blue ?? ""]: pawn.color === "blue",
            [styles.green ?? ""]: pawn.color === "green"
          })}
          justify="center"
        >
          <Text style={{ color: pawn.color === "yellow" ? "black" : "white" }}>
            {capitalize(pawn.color)}
          </Text>
        </Flex>
        {isSelected && <Crosshair1Icon height={30} width={30} />}
      </Flex>
    );
  };

  return (
    <Flex className={styles.selectPawn} direction="column" gap="10px">
      {availablePawns.map((pawn) => renderSinglePawn(pawn))}
    </Flex>
  );
};

import { Flex } from "@/lib/radix/Flex";
import { ClientServiceCallers } from "@/services/serviceCallers";
import { useTileSelector } from "@/stores/tiles/tilesStore";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon
} from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { Edge, isServiceError } from "@resync-games/api";
import styles from "./PawnMovement.module.scss";
import clsx from "clsx";

const flavorTextToIcon = {
  DOWN: <CaretDownIcon height={50} width={50} />,
  LEFT: <CaretLeftIcon height={50} width={50} />,
  RIGHT: <CaretRightIcon height={50} width={50} />,
  UP: <CaretUpIcon height={50} width={50} />
};

const flavorTextToPosition = {
  DOWN: { bottom: "3px", left: "50%", transform: "translateX(-50%)" },
  LEFT: { left: "3px", top: "50%", transform: "translateY(-50%)" },
  RIGHT: { right: "3px", top: "50%", transform: "translateY(-50%)" },
  UP: { left: "50%", top: "3px", transform: "translateX(-50%)" }
};

export function PawnMovement() {
  const { pawnState, outboundEdges, selectedPawnId } = useTileSelector(
    (state) => state.pawnState
  );
  const { game } = useTileSelector((state) => state.tileGame);

  const selectedPawn =
    selectedPawnId !== undefined ? pawnState[selectedPawnId] : undefined;
  if (selectedPawn === undefined) {
    return;
  }

  const outboundEdgesForPawn = outboundEdges[selectedPawn.onTileId] ?? [];

  const onMovePawn = (edge: Edge) => async () => {
    if (game == null) {
      return;
    }

    const updatedPawn = await ClientServiceCallers.tileGame.movePawn({
      fromTileId: selectedPawn.onTileId,
      gameId: game.tileGameId,
      tilePawnId: selectedPawn.tilePawnId,
      toTileId: edge.toTileId
    });
    if (isServiceError(updatedPawn)) {
      return;
    }

    console.log({ didMove: updatedPawn.didMove });
  };

  return (
    <Flex className={styles.pawnMovementContainer} flex="grow">
      {outboundEdgesForPawn.map((edge) => (
        <IconButton
          className={styles.movement}
          key={edge.edgeId}
          onClick={onMovePawn(edge)}
          size="4"
          style={
            flavorTextToPosition[
              edge.flavorText as keyof typeof flavorTextToPosition
            ]
          }
          variant="outline"
        >
          {flavorTextToIcon[edge.flavorText as keyof typeof flavorTextToIcon]}
        </IconButton>
      ))}
      <Flex
        className={clsx(styles.colorIndicator, {
          [styles.red ?? ""]: selectedPawn.color === "red",
          [styles.yellow ?? ""]: selectedPawn.color === "yellow",
          [styles.blue ?? ""]: selectedPawn.color === "blue",
          [styles.green ?? ""]: selectedPawn.color === "green"
        })}
      />
    </Flex>
  );
}

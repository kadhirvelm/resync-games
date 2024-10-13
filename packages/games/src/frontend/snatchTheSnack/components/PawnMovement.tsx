import { Flex } from "@/lib/radix/Flex";
import styles from "./PawnMovement.module.scss";
import {
  updateSnatchTheSnackGameState,
  useGameStateDispatch,
  useGameStateSelector
} from "../store/snatchTheSnackRedux";
import { useMemo } from "react";
import { indexTileMap } from "./utils/indexTileMap";
import { Edge } from "@resync-games/api";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon
} from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
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
  const dispatch = useGameStateDispatch();

  const gameInfo = useGameStateSelector((s) => s.gameStateSlice.gameInfo);
  const gameState = useGameStateSelector((s) => s.gameStateSlice.gameState);

  console.log({ gameState });

  const tileMap = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.tileMap
  );
  const pawnState = useGameStateSelector(
    (s) => s.gameStateSlice.gameState?.pawns
  );
  const selectedPawnId = useGameStateSelector(
    (s) => s.gameStateSlice.localState?.selectedPawn
  );

  const indexedMap = useMemo(() => {
    if (tileMap === undefined) {
      return;
    }

    return indexTileMap(tileMap);
  }, [tileMap]);

  const selectedPawn =
    selectedPawnId !== undefined ? pawnState?.[selectedPawnId] : undefined;
  if (
    gameInfo === undefined ||
    indexedMap === undefined ||
    gameState === undefined ||
    selectedPawn === undefined
  ) {
    return;
  }

  const { outboundEdges } = indexedMap;

  const outboundEdgesForPawn = outboundEdges[selectedPawn.onTile] ?? [];

  const onMovePawn = (edge: Edge) => async () => {
    if (gameInfo == null) {
      return;
    }

    dispatch(
      updateSnatchTheSnackGameState({
        pawns: {
          ...gameState.pawns,
          [selectedPawn.pawnId]: {
            ...selectedPawn,
            lastUpdatedAt: new Date().toISOString(),
            onTile: edge.toTileId
          }
        }
      })
    );
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

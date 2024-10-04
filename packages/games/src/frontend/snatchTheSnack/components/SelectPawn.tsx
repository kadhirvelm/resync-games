import { Flex } from "@/lib/radix/Flex";
import styles from "./SelectPawn.module.scss";
// import { useGameStateSelector } from "@/stores";

export const SelectPawn = () => {
  // const dispatch = useGameStateDispatch();

  // const gameState = useGameStateSelector(
  //   (state) => state.gameStateSlice.gameState
  // );

  // const availablePawns = [] // Object.values(gameState.pawns);
  // const sortedAvailablePawns = useMemo(() => {
  //   return availablePawns
  //     .slice()
  //     .sort((a, b) => a.color.localeCompare(b.color));
  // }, [availablePawns]);

  // const renderSinglePawn = (pawn: SnatchTheSnackPawn) => {
  //   const isSelected = false;

  //   const selectPawn = () => {
  //     console.log("Attempted to select ", pawn);
  //   };

  //   return (
  //     <Flex align="center" gap="2" key={pawn.id} onClick={selectPawn}>
  //       <Flex
  //         align="center"
  //         className={clsx(styles.pawnSelector, {
  //           [styles.red ?? ""]: pawn.color === "red",
  //           [styles.yellow ?? ""]: pawn.color === "yellow",
  //           [styles.blue ?? ""]: pawn.color === "blue",
  //           [styles.green ?? ""]: pawn.color === "green"
  //         })}
  //         justify="center"
  //       >
  //         <Text style={{ color: pawn.color === "yellow" ? "black" : "white" }}>
  //           {capitalize(pawn.color)}
  //         </Text>
  //       </Flex>
  //       {isSelected && (
  //         <Crosshair1Icon className={styles.crossHair} height={30} width={30} />
  //       )}
  //     </Flex>
  //   );
  // };

  return (
    <Flex className={styles.selectPawn} direction="column" gap="10px">
      {/* {sortedAvailablePawns.map((pawn) => renderSinglePawn(pawn))} */}
    </Flex>
  );
};

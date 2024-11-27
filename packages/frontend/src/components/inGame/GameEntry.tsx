"use client";

import { GameStateHandler, GameStateReduxStore } from "@/redux";
import { GameId, GameType } from "@resync-games/api";
import { lazy, useContext, useMemo } from "react";
import { PlayerContext } from "../player/PlayerContext";
import { GoHome } from "./components/GoHome";

const FetchGameEntry = lazy(() => import("./components/FetchGameEntry"));

export const GameEntry = ({
  store,
  gameId,
  gameSlug
}: {
  gameId: GameId;
  gameSlug: GameType;
  store: GameStateReduxStore;
}) => {
  const player = useContext(PlayerContext);

  const gameStateHandler = useMemo(() => {
    return new GameStateHandler(store, player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  return (
    <>
      <FetchGameEntry gameSlug={gameSlug} gameStateHandler={gameStateHandler} />
      <GoHome />
    </>
  );
};

import { useCallback, useRef } from "react";

const AVAILABLE_SOUNDS = {
  "new-round": "/sounds/new-round.mp3",
  "new-word": "/sounds/new-word.mp3",
  "starting-gun": "/sounds/starting-gun.mp3"
};

export const useSound = (sound: keyof typeof AVAILABLE_SOUNDS) => {
  const url = AVAILABLE_SOUNDS[sound];
  const audioRef = useRef(new Audio(url));

  const play = useCallback(() => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }, []);

  return {
    play
  };
};

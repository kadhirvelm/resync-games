import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useFishbowlSelector } from "../../store/fishbowlRedux";

export const WordCelebration = () => {
  const activeRound = useFishbowlSelector(
    (s) => s.gameStateSlice.gameState?.round
  );

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (activeRound == null || activeRound.correctGuesses.length === 0) {
      return;
    }

    // Show confetti when a new correct guess is made
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 500);
    return () => clearTimeout(timer);
  }, [activeRound?.correctGuesses.length]);

  const sharedConfettiProps = {
    confettiSource: {
      h: 100,
      w: 100,
      y: window.innerHeight
    },
    friction: 0.85,
    gravity: 1.2,
    initialVelocityY: 200,
    numberOfPieces: 200,
    recycle: showConfetti,
    tweenDuration: 700
  };

  if (activeRound?.correctGuesses.length === 0) {
    return;
  }

  return (
    <>
      <Confetti
        {...sharedConfettiProps}
        confettiSource={{
          ...sharedConfettiProps.confettiSource,
          x: 0
        }}
        initialVelocityX={150}
      />
      <Confetti
        {...sharedConfettiProps}
        confettiSource={{
          ...sharedConfettiProps.confettiSource,
          x: window.innerWidth
        }}
        initialVelocityX={-150}
      />
    </>
  );
};

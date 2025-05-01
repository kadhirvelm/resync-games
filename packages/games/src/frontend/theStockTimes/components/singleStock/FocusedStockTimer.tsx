import { Flex, Progress } from "@/lib/radix";
import { useFocusedStockTimer } from "../../hooks/focusedStockTimer";

export const FocusedStockTimer = () => {
  const { timeLeft } = useFocusedStockTimer();

  const totalTimeLeft = Math.min(100 - timeLeft, 100);

  return (
    <Flex>
      <Progress
        color={totalTimeLeft < 33 ? "red" : "blue"}
        value={totalTimeLeft}
      />
    </Flex>
  );
};

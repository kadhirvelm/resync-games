import { Flex, Progress } from "../../../components";
import { useFocusedStockTimer } from "../../hooks/focusedStockTimer";

export const FocusedStockTimer = () => {
  const { timeLeft } = useFocusedStockTimer();

  const totalTimeLeft = 100 - timeLeft;

  return (
    <Flex>
      <Progress
        color={totalTimeLeft < 33 ? "red" : "blue"}
        value={totalTimeLeft}
      />
    </Flex>
  );
};

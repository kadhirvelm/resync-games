import { StockTimesPlayer } from "../../../../backend/theStockTimes/theStockTimes";
import { Button, Flex, Text, Progress } from "../../../components";
import { useStorePower } from "../../hooks/storePower";

export const ActivateStorePower = ({
  storePower,
  disabled,
  text,
  onClick
}: {
  disabled?: boolean;
  onClick?: () => void;
  storePower: keyof StockTimesPlayer["storePowers"];
  text?: string;
}) => {
  const { isAvailable, timeLeft } = useStorePower(storePower);

  if (isAvailable && onClick !== undefined) {
    return (
      <Button color="green" disabled={disabled} onClick={onClick}>
        {text ?? "Activate"}
      </Button>
    );
  }

  if (isAvailable) {
    return (
      <Button color="green" disabled={disabled} variant="outline">
        Available
      </Button>
    );
  }

  return (
    <Flex direction="column" flex="1" gap="2">
      <Text color="gray">{text}</Text>
      <Progress color="blue" value={timeLeft} />
    </Flex>
  );
};

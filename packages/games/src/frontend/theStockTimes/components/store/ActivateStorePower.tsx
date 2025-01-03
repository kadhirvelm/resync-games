import { StockTimesPlayer } from "../../../../backend/theStockTimes/theStockTimes";
import { Button, Progress } from "../../../components";
import { useStorePower } from "../../hooks/storePower";

export const ActivateStorePower = ({
  storePower,
  text,
  onClick
}: {
  onClick?: () => void;
  storePower: keyof StockTimesPlayer["storePowers"];
  text?: string;
}) => {
  const { isAvailable, timeLeft } = useStorePower(storePower);

  if (isAvailable && onClick !== undefined) {
    return (
      <Button color="green" onClick={onClick}>
        {text ?? "Activate"}
      </Button>
    );
  }

  if (isAvailable) {
    return (
      <Button color="green" variant="outline">
        Available
      </Button>
    );
  }

  return <Progress color="blue" value={timeLeft} />;
};

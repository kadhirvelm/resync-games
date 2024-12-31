import { StockTimesPlayer } from "../../../../backend/theStockTimes/theStockTimes";
import { Button, Progress } from "../../../components";
import { useStorePower } from "../../hooks/storePower";

export const ActivateStorePower = ({
  storePower,
  onClick
}: {
  onClick: () => void;
  storePower: keyof StockTimesPlayer["storePowers"];
}) => {
  const { isAvailable, timeLeft } = useStorePower(storePower);

  if (isAvailable) {
    return (
      <Button color="green" onClick={onClick}>
        Activate
      </Button>
    );
  }

  return <Progress color="blue" value={timeLeft} />;
};

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Stock } from "../../../../backend/theStockTimes/theStockTimes";
import { Button, Flex, Text } from "../../../components";
import {
  updateTheStockTimesLocalState,
  useStockTimesGameStateDispatch
} from "../../store/theStockTimesRedux";
import styles from "./StockDetails.module.scss";

export const StockDetails = ({
  thisStock,
  viewingStockSymbol
}: {
  thisStock: Stock;
  viewingStockSymbol: string;
}) => {
  const dispatch = useStockTimesGameStateDispatch();

  const onGoBack = () => {
    dispatch(updateTheStockTimesLocalState({ viewingStockSymbol: undefined }));
  };

  return (
    <Flex className={styles.details} direction="column" p="3">
      <Flex align="center" gap="4">
        <Flex>
          <Button onClick={onGoBack} variant="outline">
            <ArrowLeftIcon /> <Text>Back</Text>
          </Button>
        </Flex>
        <Text size="4" weight="bold">
          {viewingStockSymbol} - {thisStock.title}
        </Text>
      </Flex>
      <Text color="gray" mt="2" size="2">
        {thisStock.description}
      </Text>
    </Flex>
  );
};

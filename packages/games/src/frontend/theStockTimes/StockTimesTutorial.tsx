import { RocketIcon } from "@radix-ui/react-icons";
import { TheStockTimesGameConfiguration } from "../../backend/theStockTimes/theStockTimes";
import { Flex, DisplayText } from "@/lib/radix";
import { displayDollar } from "./utils/displayDollar";

export const StockTimesTutorial = ({
  gameConfiguration
}: {
  gameConfiguration: object;
}) => {
  const typedGameConfiguration =
    gameConfiguration as TheStockTimesGameConfiguration;
  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="1">
        <DisplayText color="gray" size="2">
          Overview
        </DisplayText>
        <DisplayText>
          Welcome to the stock times! A game where you and your team try to make
          more money than your opponent. It's important to know this isn't a
          stock market simulator. It's a gambling game! There is no penalty for
          buying and selling stocks.
        </DisplayText>
      </Flex>
      <Flex direction="column" gap="1">
        <DisplayText color="gray" size="2">
          Objective
        </DisplayText>
        <DisplayText>
          The game starts with{" "}
          <DisplayText weight="bold">
            {typedGameConfiguration.totalStocks}
          </DisplayText>{" "}
          stocks that you can buy and sell. You will be given{" "}
          <DisplayText weight="bold">
            {displayDollar(typedGameConfiguration.startingCash)}
          </DisplayText>{" "}
          cash to start trading with. There is no penalty, or tax, for buying
          and selling stocks. Your goal is to buy stocks low and sell them high,
          making as much money as possible. The team with the highest average
          portofolio at the end of 10 days of trading wins!
        </DisplayText>
      </Flex>
      <Flex direction="column" gap="1">
        <DisplayText color="gray" size="2">
          Stock pricing
        </DisplayText>
        <DisplayText>
          The game operates in a series of day-night cycles. Every night, new
          news articles will come out. The news articles will relate to the
          stocks in some way. Some will be positive, some will be negative, some
          will be neutral.
        </DisplayText>
        <DisplayText>
          During the day cycle, the stock will be priced based on the news.
          Positive articles will cause the stock price to rise, negative
          articles will cause the stock price to fall, and neutral articles will
          roughly maintain the price.
        </DisplayText>
      </Flex>
      <Flex direction="column" gap="1">
        <DisplayText color="gray" size="2">
          Store and Sabotage
        </DisplayText>
        <DisplayText>
          In addition to buying and sell stocks, there is a store and a sabotage
          screen where you can purchase special powers. Be sure to check them
          out. Some powers will boost your portfolio, and others will let you
          mess with your opponents.
        </DisplayText>
      </Flex>
      <Flex direction="column" gap="1">
        <DisplayText color="gray" size="2">
          Recommended strategy
        </DisplayText>
        <DisplayText>
          It's tempting to have a balanced portfolio, but we recommend against
          it. There is too much information to process and the prices will
          fluctuate wildly. Instead, we recommend betting all your cash on one,
          at most two stocks at any given time, selling all your holdings at the
          end of each day. The <RocketIcon /> and 0.5 buttons will be helpful to
          rapidly purchase stocks.
        </DisplayText>
        <DisplayText>
          In addition, we recommend keeping a close eye on how your opponents
          portfolios are doing. If you see them doing well, there might be some
          options in the sabotage tab to mess with their success. Good luck!
        </DisplayText>
      </Flex>
    </Flex>
  );
};

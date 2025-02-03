export interface TheStockTimesLocalState {
  viewingStockSymbol: string | undefined;
  viewingTab: string;
}

export const INITIAL_THE_STOCK_TIMES_LOCAL_STATE: TheStockTimesLocalState = {
  viewingStockSymbol: undefined,
  viewingTab: "portfolio"
};

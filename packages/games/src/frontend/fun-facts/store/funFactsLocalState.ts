export interface FunFactsLocalState {
  /**
   * The current fact being typed by the user
   */
  currentFactInput: string;
  /**
   * Whether the user has finished submitting all their facts
   */
  hasFinishedSubmitting: boolean;
}

export const INITIAL_FUN_FACTS_LOCAL_STATE: FunFactsLocalState = {
  currentFactInput: "",
  hasFinishedSubmitting: false
};

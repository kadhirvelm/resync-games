import { Dispatch, EnhancedStore, UnknownAction } from "@reduxjs/toolkit";
import { useRef } from "react";
import { Provider } from "react-redux";

export function ReduxGate<T extends EnhancedStore>({
  createStore,
  children,
  initializeStore
}: {
  children: (store: T) => React.ReactNode;
  createStore: () => T;
  initializeStore: (dispatch: Dispatch<UnknownAction>) => void;
}) {
  const storeRef = useRef<T>();
  if (!storeRef.current) {
    storeRef.current = createStore();
    initializeStore(storeRef.current.dispatch);
  }

  return (
    <Provider store={storeRef.current}>{children(storeRef.current)}</Provider>
  );
}

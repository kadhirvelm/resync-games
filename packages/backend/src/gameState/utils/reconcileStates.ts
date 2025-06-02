import { WithTimestamp, NestedTimestamp } from "@/imports/api";
import { StateReconcilerMethod } from "@/imports/games";

function compareDates(
  dateOne: string | undefined,
  dateTwo: string | undefined
): -1 | 0 | 1 {
  const one = dateOne === undefined ? undefined : new Date(dateOne).valueOf();
  const two = dateTwo === undefined ? undefined : new Date(dateTwo).valueOf();

  if (one === two || (one === undefined && two === undefined)) {
    return 0;
  }

  if (one === undefined && two !== undefined) {
    return -1;
  }

  if (one !== undefined && two === undefined) {
    return 1;
  }

  return (one ?? 0) > (two ?? 0) ? 1 : -1;
}

function topLevel(
  previousState: WithTimestamp,
  nextState: WithTimestamp
): ReconciledState {
  const comparedDates = compareDates(
    previousState.lastUpdatedAt,
    nextState.lastUpdatedAt
  );

  if (comparedDates === 0 || comparedDates === 1) {
    return { didAcceptChange: false, newState: previousState };
  }

  return { didAcceptChange: true, newState: nextState };
}

function closest(
  previousState: NestedTimestamp,
  nextState: NestedTimestamp,
  fallback: NestedTimestamp
): ReconciledState {
  let didAcceptChange = false;
  const reconciledState = fallback;

  for (const key in nextState) {
    const comparedDates = compareDates(
      previousState[key]?.lastUpdatedAt,
      nextState[key]?.lastUpdatedAt
    );

    // If the nextState has a newer timestamp, or has values the previous state does not have, we accept the change and move to the next key
    if (
      comparedDates === -1 ||
      (reconciledState[key] === undefined && nextState[key] !== undefined)
    ) {
      didAcceptChange = true;
      reconciledState[key] = nextState[key];
      continue;
    }

    // If the previousState has a newer timestamp, we maintain that change and move to the next key
    if (comparedDates === 1) {
      reconciledState[key] = previousState[key];
    }

    // If the timestamps are the same or the previousState had an older one, we need to check the nested object, but only if there's an object to check
    if (
      typeof reconciledState[key] !== "object" ||
      Array.isArray(reconciledState[key]) ||
      reconciledState[key] == null
    ) {
      continue;
    }

    // We recursively check the nested object starting at this key - we want to use the closest timestamp to the key to decide which state to use
    const { didAcceptChange: reconciledDidAccept, newState } = closest(
      previousState[key] as unknown as NestedTimestamp,
      nextState[key] as unknown as NestedTimestamp,
      fallback[key] as unknown as NestedTimestamp
    );

    // And reconcile the recursive results with the current results
    didAcceptChange = didAcceptChange || reconciledDidAccept;
    reconciledState[key] = newState as WithTimestamp;
  }

  return { didAcceptChange, newState: reconciledState };
}

export interface ReconciledState {
  didAcceptChange: boolean;
  newState: WithTimestamp | NestedTimestamp;
}

export function reconcileStates(
  previousState: WithTimestamp | NestedTimestamp,
  nextState: WithTimestamp | NestedTimestamp,
  stateReconcilerMethod: StateReconcilerMethod
): ReconciledState {
  if (stateReconcilerMethod === "top-level") {
    return topLevel(previousState as WithTimestamp, nextState as WithTimestamp);
  }

  const { didAcceptChange, newState: fallbackState } = topLevel(
    previousState as WithTimestamp,
    nextState as WithTimestamp
  );
  const { didAcceptChange: closestChange, newState: closestState } = closest(
    previousState as NestedTimestamp,
    nextState as NestedTimestamp,
    fallbackState as NestedTimestamp
  );

  return {
    didAcceptChange: didAcceptChange || closestChange,
    newState: closestState
  };
}

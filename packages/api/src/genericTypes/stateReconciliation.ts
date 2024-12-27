/**
 * Uses the `lastUpdatedAt` field to determine which state to reconcile.
 */
export interface WithTimestamp {
  lastUpdatedAt: string;
}

/**
 * A nested object with `lastUpdatedAt` fields.
 */
export interface NestedTimestamp {
  [key: string]: WithTimestamp;
}

/**
 * An object with a `lastUpdatedAt` field.
 */
export type TimestampedState = WithTimestamp | NestedTimestamp;

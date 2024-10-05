/**
 * Helper method to merge two objects together recursively.
 * @param target The target object to merge into.
 * @param source The source object to merge from.
 * @returns The target object with the source object merged into it.
 */
export function deepMerge<T>(target: T, source: T): T {
  for (const key in source) {
    if (source[key] instanceof Object && key in (target as object)) {
      target[key] = deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }

  return target;
}

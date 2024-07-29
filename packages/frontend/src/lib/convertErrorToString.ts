/* eslint-disable @typescript-eslint/no-explicit-any */

function getOwnProperties(object: object): string {
  const outputObject: { [key: string]: unknown } = {};

  for (const key in object) {
    if (!Object.prototype.hasOwnProperty.call(object, key)) {
      continue;
    }

    outputObject[key] = (object as any)[key];
  }

  return JSON.stringify(outputObject);
}

export function convertErrorToString(error: any): string {
  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (error instanceof Object) {
    return getOwnProperties(error);
  }

  return `Unknown error type: ${error}`;
}

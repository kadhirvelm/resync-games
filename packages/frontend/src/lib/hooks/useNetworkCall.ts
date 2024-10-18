import { ServiceError, isServiceError } from "@resync-games/api";
import { useState, useEffect, useCallback } from "react";

export function useNetworkCall<T>(
  networkCall: () => Promise<T | ServiceError>,
  onError?: (error: ServiceError) => void
) {
  const [result, setResult] = useState<T | null>(null);

  const conductNetworkCall = useCallback(async () => {
    const result = await networkCall();
    if (isServiceError(result)) {
      console.error(result);
      onError?.(result);
      return;
    }

    setResult(result);
  }, []);

  useEffect(() => {
    conductNetworkCall();
  }, [conductNetworkCall]);

  return {
    result,
    setResult
  };
}

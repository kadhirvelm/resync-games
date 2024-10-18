import { ServiceError, isServiceError } from "@resync-games/api";
import { useState, useEffect, useCallback, useRef } from "react";

export function useNetworkCall<T>(
  networkCall: () => Promise<T | ServiceError>,
  onError?: (error: ServiceError) => void
) {
  // This is to get around the double trigger of useEffect in development mode
  const initialMountRef = useRef(false);

  const [result, setResult] = useState<T | null>(null);

  const conductNetworkCall = useCallback(async () => {
    if (initialMountRef.current) {
      return;
    }

    initialMountRef.current = true;
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
  }, []);

  return {
    result,
    setResult
  };
}

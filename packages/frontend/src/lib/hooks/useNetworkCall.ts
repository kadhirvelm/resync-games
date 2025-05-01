import { ServiceError, isServiceError } from "@/imports/api";
import { useState, useEffect, useCallback, useRef } from "react";

export function useNetworkCall<T>(
  networkCall: () => Promise<T | ServiceError>,
  onError?: (error: ServiceError) => void
) {
  // This is to get around the double trigger of useEffect in development mode
  const initialMountRef = useRef(false);

  const [hasInitialized, setHasInitialized] = useState(false);
  const [result, setResult] = useState<T | null>(null);

  const conductNetworkCall = useCallback(async () => {
    if (initialMountRef.current) {
      return;
    }

    initialMountRef.current = true;
    const result = await networkCall();
    setHasInitialized(true);

    if (isServiceError(result)) {
      console.error(result);
      onError?.(result);
      return;
    }

    setResult(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    conductNetworkCall();
  }, []);

  return {
    hasInitialized,
    result,
    setResult
  };
}

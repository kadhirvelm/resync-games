import { useCallback, useEffect, useState } from "react";

export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);

  const handler = useCallback((event: MediaQueryListEvent) => {
    setIsMobile(event.matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [handler]);

  return {
    isMobile
  };
}

import { useEffect, useState } from "react";

export const ClientGate = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (typeof window === "undefined") {
    return null;
  }

  return isClient ? <>{children}</> : null;
};

import { createContext } from "react";

export interface ResyncEnvironment {
  apiClientUrl: string;
  developmentMode: boolean;
}

export const EnvironmentContext = createContext<ResyncEnvironment>({
  apiClientUrl: "",
  developmentMode: false
});

export const EnvironmentContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <EnvironmentContext.Provider
      value={{
        apiClientUrl: process.env.NEXT_PUBLIC_API_CLIENT_URL ?? "",
        developmentMode: process.env.NEXT_PUBLIC_DEVELOPMENT_MODE === "true"
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

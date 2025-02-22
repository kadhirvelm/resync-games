import { createContext } from "react";

export interface DisplayType {
  displayType: "mobile" | "desktop" | "global-screen";
}

export const DisplayType = createContext<DisplayType>({
  displayType: "global-screen"
});

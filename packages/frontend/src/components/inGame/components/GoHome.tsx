import { NavigationButton } from "@/lib/tiles-components/NavigationButton";
import { ExitIcon } from "@radix-ui/react-icons";
import style from "./GoHome.module.scss";

export const GoHome = () => {
  return (
    <NavigationButton className={style.goHome} href="/" variant="outline">
      <ExitIcon />
    </NavigationButton>
  );
};

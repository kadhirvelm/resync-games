import {
  IconButton as RadixComponent,
  IconButtonProps as RadixComponentProps
} from "@radix-ui/themes";
import clsx from "clsx";
import styles from "./IconButton.module.scss";

export interface IconButtonProps extends RadixComponentProps {
  children: React.ReactNode;
}

export const IconButton = ({
  className,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <RadixComponent {...props} className={clsx(className, styles.iconButton)}>
      {children}
    </RadixComponent>
  );
};

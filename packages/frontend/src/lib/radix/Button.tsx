import {
  Button as RadixComponent,
  ButtonProps as RadixComponentProps
} from "@radix-ui/themes";
import clsx from "clsx";
import styles from "./Button.module.scss";

export interface ButtonProps extends RadixComponentProps {
  children: React.ReactNode;
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <RadixComponent {...props} className={clsx(className, styles.button)}>
      {children}
    </RadixComponent>
  );
};

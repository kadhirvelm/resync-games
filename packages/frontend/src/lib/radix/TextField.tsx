import * as icons from "@radix-ui/react-icons";
import { TextField as RadixComponent, Spinner } from "@radix-ui/themes";
import React from "react";

export interface TextFieldProps
  extends Omit<RadixComponent.RootProps, "onChange"> {
  className?: string;
  icon?: keyof typeof icons;
  isLoading?: boolean;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  ref?: React.RefObject<HTMLInputElement | null>;
  style?: React.CSSProperties;
  value: string;
}

export const TextField = ({
  className,
  icon,
  isLoading,
  placeholder,
  ref,
  value,
  style,
  onChange,
  ...properties
}: TextFieldProps) => {
  const maybeIcon = () => {
    if (isLoading) {
      <RadixComponent.Slot>
        <Spinner />
      </RadixComponent.Slot>;
    }

    if (icon === undefined) {
      return;
    }

    const Icon = icons[icon];
    return (
      <RadixComponent.Slot>
        <Icon height={16} width={16} />
      </RadixComponent.Slot>
    );
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange(event.currentTarget.value, event);

  return (
    <RadixComponent.Root
      className={className}
      disabled={isLoading}
      onChange={onInputChange}
      placeholder={placeholder}
      ref={ref}
      style={style}
      value={value}
      {...properties}
    >
      {maybeIcon()}
    </RadixComponent.Root>
  );
};

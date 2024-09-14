import * as icons from "@radix-ui/react-icons";
import { TextField as RadixComponent, Spinner } from "@radix-ui/themes";
import React from "react";

export interface TextFieldProps {
  icon?: keyof typeof icons;
  isLoading?: boolean;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
}

export const TextField = ({
  icon,
  isLoading,
  placeholder,
  value,
  onChange
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
      disabled={isLoading}
      onChange={onInputChange}
      placeholder={placeholder}
      value={value}
    >
      {maybeIcon()}
    </RadixComponent.Root>
  );
};

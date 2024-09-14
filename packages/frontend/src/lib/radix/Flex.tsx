import {
  Flex as RadixComponent,
  FlexProps as RadixComponentProps
} from "@radix-ui/themes";
import React from "react";

export type FlexProps = { flex?: string } & RadixComponentProps;

export const Flex = ({ flex, ...props }: FlexProps) => {
  return <RadixComponent {...props} style={{ ...props.style, flex }} />;
};

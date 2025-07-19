"use client";

import { Flex, Slider, Text } from "@radix-ui/themes";
import { ChevronsRightIcon } from "lucide-react";
import { useState } from "react";
import styles from "./SlideConfirm.module.scss";
import clsx from "clsx";

export interface SlideConfirmProps {
  confirmText?: string;
  minimumWidth?: number;
  onConfirm?: () => void;
  slideColor?: "green" | "red";
}

export const SlideConfirm = ({
  confirmText,
  onConfirm,
  minimumWidth,
  slideColor
}: SlideConfirmProps) => {
  const [value, setValue] = useState(0);

  const onSetValue = ([value]: [number]) => setValue(value);

  const onCommitValue = () => {
    if (value === 100) {
      onConfirm?.();
    }

    setValue(0);
  };

  const calculatedMinimumWidth =
    minimumWidth ?? (confirmText?.length ?? 0) * 20;

  return (
    <Flex
      className={styles.container}
      p="4"
      style={{ flex: 1, minWidth: `${calculatedMinimumWidth}px` }}
    >
      <Slider
        className={styles.sliderTrack}
        onPointerDown={(e) => {
          // Only allow dragging the thumb, not clicking the track
          if ((e.target as HTMLElement).matches('[role="slider"]')) {
            return;
          }

          e.preventDefault();
        }}
        onValueChange={onSetValue}
        onValueCommit={onCommitValue}
        value={[value]}
      />
      <Flex align="center" className={styles.text} gap="1" justify="center">
        <ChevronsRightIcon />
        <Text>{confirmText}</Text>
        <ChevronsRightIcon />
      </Flex>
      <Flex
        className={clsx(styles.slideProgress, {
          [styles.green ?? ""]:
            slideColor === undefined || slideColor === "green",
          [styles.red ?? ""]: slideColor === "red"
        })}
        style={{ width: `${value}%` }}
      />
    </Flex>
  );
};

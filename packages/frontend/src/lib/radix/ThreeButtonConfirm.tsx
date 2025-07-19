"use client";

import { Text } from "@radix-ui/themes";
import clsx from "clsx";
import { ChevronsRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Flex } from "./Flex";
import styles from "./ThreeButtonConfirm.module.scss";

export interface ThreeButtonConfirmProps {
  confirmText?: string;
  minimumWidth?: number;
  onConfirm?: () => void;
  slideColor?: "green" | "red";
}

export const ThreeButtonConfirm = ({
  confirmText,
  onConfirm,
  minimumWidth,
  slideColor
}: ThreeButtonConfirmProps) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (value === 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setValue(0);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [value]);

  useEffect(() => {
    if (value !== 100) {
      return;
    }

    onConfirm?.();

    const timeout = setTimeout(() => {
      setValue(0);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value]);

  const onIncrementValue = (expectedValue: number, newValue: number) => () => {
    if (value !== expectedValue) {
      return;
    }

    setValue(newValue);
  };

  const calculatedMinimumWidth =
    minimumWidth ?? (confirmText?.length ?? 0) * 20;

  const handleDrag = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.touches[0]?.clientX ?? 0) - rect.left;
    const width = rect.width;
    const percent = Math.floor((x / width) * 100);

    if (percent <= 33 && value === 0) {
      onIncrementValue(0, 33)();
    } else if (percent > 33 && percent <= 66 && value === 33) {
      onIncrementValue(33, 66)();
    } else if (percent > 66 && value === 66) {
      onIncrementValue(66, 100)();
    }

    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Flex
      className={styles.container}
      onTouchMove={handleDrag}
      p="2"
      style={{ flex: 1, minWidth: `${calculatedMinimumWidth}px` }}
    >
      <Flex
        align="center"
        flex="1"
        justify="center"
        onClick={onIncrementValue(0, 33)}
      >
        <Flex className={styles.one}></Flex>
      </Flex>
      <Flex
        align="center"
        flex="1"
        justify="center"
        onClick={onIncrementValue(33, 66)}
      >
        <Flex className={styles.two}></Flex>
      </Flex>
      <Flex
        align="center"
        flex="1"
        justify="center"
        onClick={onIncrementValue(66, 100)}
      >
        <Flex className={styles.three}></Flex>
      </Flex>
      <Flex align="center" className={styles.text} gap="1" justify="center">
        <ChevronsRightIcon />
        <Text>{confirmText}</Text>
        <ChevronsRightIcon />
      </Flex>
      <motion.div
        animate={{ width: `${value}%` }}
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

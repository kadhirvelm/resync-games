import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Flex } from "../radix/Flex";
import { TextField } from "../radix/TextField";
import styles from "./NumberInput.module.scss";

export interface NumberInputProps {
  className?: string;
  defaultChange?: number;
  divisibleBy?: number;
  maximum?: number;
  minimum?: number;
  onChange: (newValue: number) => void;
  value: string | number | boolean | undefined | null;
}

const getLocaleString = (
  value: string | number | boolean | undefined | null
) => {
  if (value == null) {
    return "";
  }

  if (typeof value === "number") {
    return value.toLocaleString();
  }

  const maybeNumber = parseFloat(value.toString());
  if (isNaN(maybeNumber)) {
    return "";
  }

  return maybeNumber.toLocaleString();
};

export const NumberInput = ({
  className,
  divisibleBy,
  defaultChange,
  maximum,
  minimum,
  onChange,
  value
}: NumberInputProps) => {
  const [localValue, setLocalValue] = useState(getLocaleString(value));
  const [isHover, setIsHover] = useState(false);

  const currentValue = () => {
    const sanitizedValue = localValue.replace(",", "");
    const parsedValue = parseFloat(sanitizedValue);
    if (isNaN(parsedValue)) {
      return;
    }

    return parsedValue;
  };

  const clampToRange = (value: number) => {
    return Math.min(Math.max(value, minimum ?? value), maximum ?? value);
  };

  const setNumber = (newValue: number) => {
    onChange(newValue);
    setLocalValue(getLocaleString(newValue));
  };

  const triggerOnChange = () => {
    const currValue = currentValue();

    if (currValue === undefined) {
      setLocalValue(value?.toString() ?? "");
      return;
    }

    const withinRange = clampToRange(currValue);

    const isDivisible = withinRange % (divisibleBy ?? currValue) === 0;
    if (!isDivisible) {
      setLocalValue(value?.toString() ?? "");
      return;
    }

    setNumber(withinRange);
  };

  const onIncreaseOrDecrease =
    (change: -1 | 1) => (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.preventDefault();

      const currValue = currentValue();
      if (currValue === undefined) {
        return setNumber(clampToRange(0));
      }

      const newValue = currValue + (divisibleBy ?? defaultChange ?? 1) * change;
      return setNumber(clampToRange(newValue));
    };

  return (
    <Flex
      align="center"
      className={styles.textFieldContainer}
      flex="1"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <TextField
        className={className}
        onBlur={triggerOnChange}
        onChange={setLocalValue}
        style={{ flex: 1 }}
        value={localValue}
      />
      <motion.div
        className={styles.arrowsContainer}
        layout
        style={{ right: isHover ? 0 : "-25px" }}
      >
        <Flex direction="column">
          <Flex
            align="center"
            className={styles.arrow}
            justify="center"
            onClick={onIncreaseOrDecrease(1)}
          >
            <ChevronUpIcon color="gray" size={14} />
          </Flex>
          <Flex
            align="center"
            className={styles.arrow}
            justify="center"
            onClick={onIncreaseOrDecrease(-1)}
          >
            <ChevronDownIcon color="gray" size={14} />
          </Flex>
        </Flex>
      </motion.div>
    </Flex>
  );
};

import { Flex } from "@/lib/radix/Flex";
import clsx from "clsx";
import styles from "./SocketStatus.module.scss";

export const SocketStatus = ({
  connectionStatus
}: {
  connectionStatus: boolean;
}) => {
  return (
    <Flex
      className={clsx(styles.indicator, {
        [styles.connected as string]: connectionStatus,
        [styles.disconnected as string]: !connectionStatus
      })}
    />
  );
};

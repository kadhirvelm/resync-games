import { Box } from "grommet";
import styles from "./SocketStatus.module.scss";
import clsx from "clsx";

export const SocketStatus = ({
  connectionStatus
}: {
  connectionStatus: boolean;
}) => {
  return (
    <Box
      className={clsx(styles.indicator, {
        [styles.connected as string]: connectionStatus,
        [styles.disconnected as string]: !connectionStatus
      })}
    />
  );
};

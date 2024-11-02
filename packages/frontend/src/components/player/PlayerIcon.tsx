import { thumbs } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styles from "./PlayerIcon.module.scss";
import { Flex } from "@/lib/radix/Flex";

/* eslint-disable @next/next/no-img-element */

export const PlayerIcon = ({
  name,
  dimension
}: {
  dimension: number;
  name: string;
}) => {
  const avatar = createAvatar(thumbs, {
    seed: name
  });

  return (
    <Flex style={{ height: dimension, width: dimension }}>
      <img className={styles.playerIcon} src={avatar.toDataUri()} />
    </Flex>
  );
};

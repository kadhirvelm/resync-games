import {
  adventurer,
  adventurerNeutral,
  avataaars,
  avataaarsNeutral,
  bigEars,
  bigEarsNeutral,
  bigSmile,
  bottts,
  botttsNeutral,
  croodles,
  croodlesNeutral,
  dylan,
  funEmoji,
  glass,
  icons,
  identicon,
  initials,
  lorelei,
  loreleiNeutral,
  micah,
  miniavs,
  notionists,
  notionistsNeutral,
  openPeeps,
  personas,
  pixelArt,
  pixelArtNeutral,
  rings,
  shapes,
  thumbs
} from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styles from "./PlayerIcon.module.scss";
import { Flex } from "@/lib/radix/Flex";
import { Player } from "@resync-games/api";

/* eslint-disable @next/next/no-img-element */

export const AVATAR_COLLECTIONS = [
  "adventurer",
  "adventurerNeutral",
  "avataaars",
  "avataaarsNeutral",
  "bigEars",
  "bigEarsNeutral",
  "bigSmile",
  "bottts",
  "botttsNeutral",
  "croodles",
  "croodlesNeutral",
  "dylan",
  "funEmoji",
  "glass",
  "icons",
  "identicon",
  "initials",
  "lorelei",
  "loreleiNeutral",
  "micah",
  "miniavs",
  "notionists",
  "notionistsNeutral",
  "openPeeps",
  "personas",
  "pixelArt",
  "pixelArtNeutral",
  "rings",
  "shapes",
  "thumbs"
];

export const DEFAULT_AVATAR_COLLECTION = "thumbs";

export const PlayerIcon = ({
  player,
  dimension
}: {
  dimension: number;
  player: Player;
}) => {
  const { avatarCollection, displayName: name } = player;

  const getAvatar = () => {
    const SEED = { seed: name };

    switch (avatarCollection) {
      case "adventurer":
        return createAvatar(adventurer, SEED);
      case "adventurerNeutral":
        return createAvatar(adventurerNeutral, SEED);
      case "avataaars":
        return createAvatar(avataaars, SEED);
      case "avataaarsNeutral":
        return createAvatar(avataaarsNeutral, SEED);
      case "bigEars":
        return createAvatar(bigEars, SEED);
      case "bigEarsNeutral":
        return createAvatar(bigEarsNeutral, SEED);
      case "bigSmile":
        return createAvatar(bigSmile, SEED);
      case "bottts":
        return createAvatar(bottts, SEED);
      case "botttsNeutral":
        return createAvatar(botttsNeutral, SEED);
      case "croodles":
        return createAvatar(croodles, SEED);
      case "croodlesNeutral":
        return createAvatar(croodlesNeutral, SEED);
      case "dylan":
        return createAvatar(dylan, SEED);
      case "funEmoji":
        return createAvatar(funEmoji, SEED);
      case "glass":
        return createAvatar(glass, SEED);
      case "icons":
        return createAvatar(icons, SEED);
      case "identicon":
        return createAvatar(identicon, SEED);
      case "initials":
        return createAvatar(initials, SEED);
      case "lorelei":
        return createAvatar(lorelei, SEED);
      case "loreleiNeutral":
        return createAvatar(loreleiNeutral, SEED);
      case "micah":
        return createAvatar(micah, SEED);
      case "miniavs":
        return createAvatar(miniavs, SEED);
      case "notionists":
        return createAvatar(notionists, SEED);
      case "notionistsNeutral":
        return createAvatar(notionistsNeutral, SEED);
      case "openPeeps":
        return createAvatar(openPeeps, SEED);
      case "personas":
        return createAvatar(personas, SEED);
      case "pixelArt":
        return createAvatar(pixelArt, SEED);
      case "pixelArtNeutral":
        return createAvatar(pixelArtNeutral, SEED);
      case "rings":
        return createAvatar(rings, SEED);
      case "shapes":
        return createAvatar(shapes, SEED);
      case "thumbs":
      default:
        return createAvatar(thumbs, SEED);
    }
  };

  return (
    <Flex style={{ height: dimension, width: dimension }}>
      <img className={styles.playerIcon} src={getAvatar().toDataUri()} />
    </Flex>
  );
};

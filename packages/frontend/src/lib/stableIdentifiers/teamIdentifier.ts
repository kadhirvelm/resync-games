import { PlayerInGame } from "@/imports/api";
import createHash from "create-hash";

const RED = "#f5b7b1";
const BLUE = "#a9cce3";
const WHITE = "#fff";

export function getTeamColor(team: number) {
  if (team === 0) {
    return WHITE;
  }

  if (team === 1) {
    return RED;
  }

  return BLUE;
}

function getNumber(seed: string): number {
  const hash = createHash("sha256").update(seed).digest("hex");
  return parseInt(hash, 16);
}

export function getTeamName(players: PlayerInGame[], team: number) {
  const teamPlayers = players.filter((p) => p.team === team);
  if (teamPlayers.length === 0) {
    return "None";
  }

  const seed = getNumber(teamPlayers.map((p) => p.playerId).join(""));

  const emojiSeed = seed % emojiList.length;

  return emojiList[emojiSeed] ?? "🤔";
}

const emojiList = [
  "🤪",
  "🤓",
  "✨",
  "🫧",
  "🎵",
  "🕺",
  "💪",
  "🌶️",
  "💁",
  "🕶️",
  "⚡",
  "👔",
  "🧠",
  "🤡",
  "😊",
  "🎩",
  "🌬️",
  "💝",
  "🌟",
  "🦋",
  "👑",
  "🥳",
  "🦘",
  "🤗",
  "😏",
  "😄",
  "🐦",
  "🎠",
  "🐯",
  "😜",
  "💃",
  "👗",
  "🛋️",
  "🎮",
  "👊",
  "💨",
  "🎨",
  "❄️",
  "💫",
  "🦿",
  "🎭",
  "🎢",
  "☀️",
  "🎉",
  "🎬",
  "💭",
  "🎈",
  "🎯",
  "🌈",
  "🎤",
  "🎶",
  "🎵",
  "🎧",
  "🎹",
  "🎻",
  "🎺",
  "🌸",
  "🦁",
  "🎪",
  "🎸",
  "🦚",
  "🎡",
  "🎲",
  "🎷",
  "🦄",
  "🎱",
  "🎳",
  "🎰",
  "🎼",
  "🎥",
  "🎫",
  "🎪",
  "🎾",
  "🎣",
  "🎮",
  "🎨"
];

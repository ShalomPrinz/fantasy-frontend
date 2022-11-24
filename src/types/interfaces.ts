import type { Jersey } from "../res";

const roles = ["GK", "DEF", "MID", "ATT"] as const;
type PlayerRole = typeof roles[number];

type Player = {
  id: number;
  name: string;
  role: PlayerRole;
  team: Jersey;
};

export { Player, PlayerRole };

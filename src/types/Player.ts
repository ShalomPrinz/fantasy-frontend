import type { Jersey } from "../res";

const roles = ["GK", "DEF", "MID", "ATT"] as const;
type PlayerRole = typeof roles[number];

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  role: PlayerRole;
  team: Jersey;
}

function getFullName({ firstName, lastName }: Player) {
  if (firstName && !lastName) return firstName;
  if (!firstName && lastName) return lastName;
  return firstName + " " + lastName;
}

export { getFullName };
export type { Player, PlayerRole };

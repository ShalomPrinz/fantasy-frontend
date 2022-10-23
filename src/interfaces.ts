const roles = ["GK", "DEF", "MID", "ATT"] as const;
type PlayerRole = typeof roles[number];

interface Player {
  id: number;
  name: string;
  role: PlayerRole;
  team: string;
}

export { Player, PlayerRole };

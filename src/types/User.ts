import type { Message } from "../features/inbox";
import type { LeagueInfo } from "../features/leagues";
import { Team } from "../features/team";

export interface User {
  id: string;
  inbox: Message[];
  leagues: LeagueInfo[];
  name: string;
  team: Team;
}

export interface QueriedUser {
  id: string;
  username: string;
}

import { LeagueInfo } from "./League";

interface Message {
  id: string;
  from: string;
  league: LeagueInfo;
}

export type { Message };

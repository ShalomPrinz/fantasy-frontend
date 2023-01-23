import { LeagueInfo } from "../../leagues";

interface Message {
  id: string;
  from: string;
  league: LeagueInfo;
}

export type { Message };

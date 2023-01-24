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

export interface RegisterUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

/** Receive user from response, Returns app user object */
export function parseUser(user: any) {
  const { id, inbox, leagues, username, team } = user;
  const userTeam = new Team(team, true);
  const appUser: User = {
    id,
    inbox,
    leagues: leagues || [],
    name: username,
    team: userTeam,
  };
  return appUser;
}

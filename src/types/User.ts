import type { LeagueInfo } from "./League";
import Team from "./Team";

export interface User {
  id: string;
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
  const { id, leagues, username, team } = user;
  const userTeam = new Team(team, true);
  const appUser: User = {
    id,
    leagues: leagues || [],
    name: username,
    team: userTeam,
  };
  return appUser;
}

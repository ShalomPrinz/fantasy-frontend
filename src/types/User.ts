import type { LeagueInfo } from "./League";
import Team from "./Team";

export interface User {
  id: string;
  leagues: LeagueInfo[];
  name: string;
  team: Team;
}

export interface RegisterUser {
  fullName: string;
  nickname: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

/** Receive user from response, Returns app user object */
export function parseUser(user: any) {
  const { id, leagues, nickname, team } = user;
  const userTeam = new Team(team, true);
  const appUser: User = {
    id,
    leagues: leagues || [],
    name: nickname,
    team: userTeam,
  };
  return appUser;
}

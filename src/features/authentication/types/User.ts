import { User } from "../../../types";
import { Team } from "../../team";

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

import { League } from "./League";
import Team from "./Team";

class User {
  leagues: League[];
  name: string;
  team: Team;

  constructor(leagues: League[], name: string, team: Team) {
    this.leagues = leagues;
    this.name = name;
    this.team = team;
  }
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

export default User;

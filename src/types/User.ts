import Team from "./Team";

class User {
  name: string;
  team: Team;

  constructor(name: string, team: Team) {
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

export default User;

import { isPlayerRole } from "../../../types";
import type { Player, PlayerRole } from "../../../types";

type Players = {
  [key in PlayerRole]: Player[];
};

class Team {
  readonly players: Players = {
    GK: [],
    DEF: [],
    MID: [],
    ATT: [],
  };
  count: number;
  isUserTeam: boolean;

  constructor(players: Player[], isUserTeam?: boolean) {
    this.count = 0;
    this.isUserTeam = Boolean(isUserTeam);
    players?.forEach((p) => this.addPlayer(p));
  }

  addPlayer(p: Player) {
    if (!isPlayerRole(p.role) || this.contains(p)) return false;

    this.players[p.role].push(p);
    this.count += 1;
    return true;
  }

  removePlayer(p: Player) {
    if (!isPlayerRole(p.role) || !this.contains(p)) return false;

    const index = this.players[p.role].findIndex((pl) => pl.id === p.id);
    this.players[p.role].splice(index, 1);
    this.count -= 1;
    return true;
  }

  contains({ id, role }: Player) {
    if (!isPlayerRole(role)) return false;
    return this.players[role].findIndex((p) => p.id === id) !== -1;
  }

  clone() {
    const cloned = new Team([], this.isUserTeam);
    Object.values(this.players).forEach((arr) =>
      arr.forEach((p) => cloned.addPlayer(p))
    );
    return cloned;
  }
}

export default Team;

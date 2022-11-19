import { Player, PlayerRole } from "./interfaces";

type Players = {
  [key in PlayerRole]?: Player[];
};

type PlayerPairs = [Players, Players];

class Team {
  readonly players: Players = {
    GK: [],
    DEF: [],
    MID: [],
    ATT: [],
  };
  count: number;

  constructor(players: Player[]) {
    this.count = 0;
    players?.forEach((p) => this.addPlayer(p));
  }

  addPlayer(p: Player) {
    if (this.players[p.role]) {
      this.players[p.role]!.push(p);
      this.count += 1;
    }
  }

  contains({ id, role }: Player) {
    if (this.players[role]) {
      return this.players[role]!.findIndex((p) => p.id === id) !== -1;
    } else return false;
  }

  clone() {
    const cloned = new Team([]);
    Object.values(this.players).forEach((arr) =>
      arr.forEach((p) => cloned.addPlayer(p))
    );
    return cloned;
  }

  byPairs(): PlayerPairs {
    return [
      {
        GK: this.players.GK,
        DEF: this.players.DEF,
      },
      {
        MID: this.players.MID,
        ATT: this.players.ATT,
      },
    ];
  }
}

export default Team;
export { PlayerPairs };

import { Player, PlayerRole } from "interfaces";

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
    players.forEach((p) => {
      this.players[p.role]?.push(p);
      this.count += 1;
    });
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

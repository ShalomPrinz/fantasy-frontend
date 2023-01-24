import { Player } from "../";
import Team from "../Team";

const player: Player = {
  id: 0,
  name: "Test",
  role: "DEF",
  team: "Barcelona",
};

describe("Team", () => {
  it("should create a team with given player", () => {
    const team = new Team([player]);
    expect(team.players.DEF![0]).toBe(player);
  });

  describe("Players change", () => {
    it("should add a player to team", () => {
      const team = new Team([]);
      expect(team.contains(player)).toBe(false);

      team.addPlayer(player);
      expect(team.contains(player)).toBe(true);
    });

    it("should not add player who is already on team", () => {
      const team = new Team([player]);
      expect(team.count).toBe(1);

      const result = team.addPlayer(player);
      expect(result).toBe(false);
      expect(team.count).toBe(1);
    });

    it("should remove a player from team", () => {
      const team = new Team([player]);
      expect(team.count).toBe(1);

      team.removePlayer(player);
      expect(team.count).toBe(0);
    });

    it("should not allow removing player who is not on team", () => {
      const team = new Team([]);
      const result = team.removePlayer(player);
      expect(result).toBe(false);
    });
  });

  describe("Data validations", () => {
    it("should confirm if player is in team", () => {
      const team = new Team([player]);
      expect(team.contains(player)).toBe(true);
    });

    it("should confirm if player is not in team", () => {
      const team = new Team([]);
      expect(team.contains(player)).toBe(false);
    });

    it("should clone a team", () => {
      const players: Player[] = [
        player,
        {
          id: 1,
          name: "Test2",
          role: "ATT",
          team: "Dortmund",
        },
      ];
      const team = new Team(players);
      const cloned = team.clone();
      expect(cloned.players).toEqual(team.players);

      const otherTeam = new Team([], true);
      const otherCloned = otherTeam.clone();
      expect(otherCloned.isUserTeam).toEqual(otherTeam.isUserTeam);
    });
  });
});

import { Player } from "../../../../types";

it("should pass jest checks for tests in this file", () => {
  expect(1).toBe(1);
});

export const player: Player = {
  id: 0,
  firstName: "Ter",
  lastName: "Stegen",
  role: "GK",
  team: "Barcelona",
};

export const missingTeamPlayer = {
  id: 1,
  firstName: "Ter",
  lastName: "Stegen",
  role: "GK",
};

export const missingIdPlayer = {
  firstName: "Ter",
  lastName: "Stegen",
  role: "GK",
  team: "Barcelona",
};

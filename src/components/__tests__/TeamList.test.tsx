import { mockTeam, render } from "setupTests";

import { TeamList } from "../";
import { Player, Team } from "../../types";

const player: Player = {
  id: 0,
  firstName: "Ter",
  lastName: "Stegen",
  role: "GK",
  team: "Barcelona",
};

describe("TeamList", () => {
  it("should render TeamList component", () => {
    const team = new Team([player]);
    mockTeam(team);

    const { asFragment } = render(<TeamList />);

    expect(asFragment()).toMatchSnapshot();
  });
});

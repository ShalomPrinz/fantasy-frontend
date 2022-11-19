import { mockUserWithTeam, render } from "setupTests";

import { TeamList } from "../";
import { Player, Team } from "../../types";

describe("TeamList", () => {
  it("should render TeamList component", () => {
    const players: Player[] = [
      { id: 0, name: "Ter Stegen", role: "GK", team: "Barcelona" },
    ];
    const team = new Team(players);
    mockUserWithTeam(team);

    const { asFragment } = render(<TeamList />);

    expect(asFragment()).toMatchSnapshot();
  });
});

import Team from "classes/Team";
import { Player } from "interfaces";
import { render } from "setupTests";

import { TeamList } from "../";

describe("TeamList", () => {
  it("should render TeamList component", () => {
    const players: Player[] = [
      { id: 0, name: "Ter Stegen", role: "GK", team: "Barcelona" },
    ];
    const team = new Team(players);

    const { asFragment } = render(<TeamList team={team} />);

    expect(asFragment()).toMatchSnapshot();
  });
});

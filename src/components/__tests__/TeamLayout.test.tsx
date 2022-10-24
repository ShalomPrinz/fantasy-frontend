import { render, setProperty, setWindowSize } from "setupTests";

import { TeamLayout } from "../";
import { FIELD_LAYOUT_MIN_WIDTH } from "../../constants";
import * as constants from "../../constants";
import { Player, Team } from "../../types";

describe("TeamLayout", () => {
  it("should render TeamList component", () => {
    const players: Player[] = [
      { id: 0, name: "Ter Stegen", role: "GK", team: "Barcelona" },
    ];
    const team = new Team(players);

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH - 1);
    const { asFragment } = render(<TeamLayout team={team} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render TeamLayout component", () => {
    const players: Player[] = [
      { id: 0, name: "Ter Stegen", role: "GK", team: "Barcelona" },
    ];
    const team = new Team(players);

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH);
    const { asFragment } = render(<TeamLayout team={team} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render bigger row margin if field width is higher than 600px", () => {
    const players: Player[] = [
      { id: 0, name: "Ter Stegen", role: "GK", team: "Barcelona" },
    ];
    const team = new Team(players);

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH);
    setProperty(constants, "FIELD_IMAGE_DEFAULT_WIDTH", 601);
    const { asFragment } = render(<TeamLayout team={team} />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("when window resize", () => {
    it("should resize player image", () => {
      // TODO. I couldn't find any test library that support that
    });
  });
});

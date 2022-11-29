import { mockTeam, render, setProperty, setWindowSize } from "setupTests";

import { TeamLayout } from "../";
import { FIELD_LAYOUT_MIN_WIDTH } from "../../constants";
import * as constants from "../../constants";
import { Player, Team } from "../../types";

const player: Player = {
  id: 0,
  firstName: "Ter",
  lastName: "Stegen",
  role: "GK",
  team: "Barcelona",
};

describe("TeamLayout", () => {
  it("should render TeamList component", () => {
    const team = new Team([player]);
    mockTeam(team);

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH - 1);
    const { asFragment } = render(<TeamLayout />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render TeamLayout component", () => {
    const team = new Team([player]);
    mockTeam(team);

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH);
    const { asFragment } = render(<TeamLayout />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render bigger row margin if field width is higher than 600px", () => {
    const team = new Team([player]);
    mockTeam(team);

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH);
    setProperty(constants, "FIELD_IMAGE_DEFAULT_WIDTH", 601);
    const { asFragment } = render(<TeamLayout />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("when window resize", () => {
    it("should resize player image", () => {
      // TODO. I couldn't find any test library that support that
    });
  });
});

import { mockTeam, render, setProperty, setWindowSize } from "setupTests";

import { TeamLayout } from "../";
import { Team } from "../../";
import { FIELD_LAYOUT_MIN_WIDTH } from "../../constants";
import * as constants from "../../constants";
import { missingIdPlayer, missingTeamPlayer, player } from "./players";

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

  describe("Runtime Errors", () => {
    it("should render with damaged data: no player team", () => {
      //@ts-expect-error should miss team property
      const team = new Team([missingTeamPlayer]);
      mockTeam(team);

      const { asFragment } = render(<TeamLayout />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render with damaged data: no player id", () => {
      //@ts-expect-error should miss id property
      const team = new Team([missingIdPlayer]);
      mockTeam(team);

      const { asFragment } = render(<TeamLayout />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should cause uncaught error and render Error Boundary", () => {
      //@ts-expect-error useTeamState is undefined and TeamLayout calls it as a function
      mockTeam(undefined);

      const { asFragment } = render(<TeamLayout />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});

import { mockTeam, render } from "setupTests";

import { TeamList } from "../";
import { Team } from "../../types";
import { missingIdPlayer, missingTeamPlayer, player } from "./players";

describe("TeamList", () => {
  it("should render TeamList component", () => {
    const team = new Team([player]);
    mockTeam(team);

    const { asFragment } = render(<TeamList />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("Runtime Errors", () => {
    it("should render with damaged data: no player team", () => {
      //@ts-expect-error should miss team property
      const team = new Team([missingTeamPlayer]);
      mockTeam(team);

      const { asFragment } = render(<TeamList />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render with damaged data: no player id", () => {
      //@ts-expect-error should miss id property
      const team = new Team([missingIdPlayer]);
      mockTeam(team);

      const { asFragment } = render(<TeamList />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should cause uncaught error and render Error Boundary", () => {
      //@ts-expect-error useTeamState is undefined and TeamList calls it as a function
      mockTeam(undefined);

      const { asFragment } = render(<TeamList />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});

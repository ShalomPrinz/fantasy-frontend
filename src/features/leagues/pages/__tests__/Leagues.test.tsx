import { UserState } from "features/authentication";
import { getTestUser, mockUser, renderWithRouterAndUser } from "setupTests";

import Leagues from "../Leagues";

const renderComponent = () => renderWithRouterAndUser(<Leagues />);

describe("Leagues", () => {
  it("should render Leagues component if loading user", () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Leagues component if no user is logged in", () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("If User is logged in", () => {
    it("should render Leagues component without presenting any league", () => {
      mockUser({ state: UserState.LOGGED_USER });
      const { asFragment } = renderComponent();
      expect(asFragment()).toMatchSnapshot();
    });

    it("should render all the leagues the user is member of", () => {
      const leagues = [
        {
          id: "League ID",
          membersCount: 1,
          name: "Big League",
        },
      ];
      const user = getTestUser({ leagues });
      mockUser({ state: UserState.LOGGED_USER, user });
      const { asFragment } = renderComponent();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

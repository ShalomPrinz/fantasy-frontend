import { UserState } from "features/authentication";
import {
  mockLeagueUndefined,
  mockUser,
  renderEffectsSleep,
  renderWithRouterAndUser,
} from "setupTests";

import InviteMembers from "../InviteMembers";

const renderComponent = (path?: string) =>
  renderWithRouterAndUser(<InviteMembers />, path);

const renderComponentSleep = async (path?: string) =>
  await renderEffectsSleep(<InviteMembers />, false, path);

describe("InviteMembers", () => {
  it("should render InviteMembers component if loading user", async () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render InviteMembers component if no user is logged in", async () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("If User is logged in", () => {
    it("should render InviteMembers component if user is not a member of the league", async () => {
      mockUser({ state: UserState.LOGGED_USER });
      const { asFragment } = await renderComponentSleep();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("Runtime Errors", () => {
    it("should cause uncaught error and render Error Boundary", () => {
      mockUser({ state: UserState.LOGGED_USER });
      mockLeagueUndefined();

      const { asFragment } = renderComponent();
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

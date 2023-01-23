import { UserState } from "features/authentication";
import {
  clickElement,
  getTestUser,
  mockUser,
  renderEffects,
  renderEffectsSleep,
  screen,
} from "setupTests";
import { Player } from "types";

import { LEAGUE_ID_LENGTH } from "../../constants";
import League from "../League";

const renderComponent = async (path?: string) =>
  await renderEffects(<League />, false, path);

const renderComponentSleep = async (path?: string) =>
  await renderEffectsSleep(<League />, false, path);

describe("League", () => {
  it("should render League component if loading user", async () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = await renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render League component if no user is logged in", async () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = await renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("If User is logged in", () => {
    it("should not allow unrecognized path to show any league content", async () => {
      const user = getTestUser({ name: "Some User" });
      mockUser({ state: UserState.LOGGED_USER, user });
      const { asFragment } = await renderComponentSleep(
        "/leagues-" + "0".repeat(LEAGUE_ID_LENGTH)
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("should show loading league message", async () => {
      const user = getTestUser({ name: "Some User" });
      mockUser({ state: UserState.LOGGED_USER, user });
      const { asFragment } = await renderComponent(
        "/leagues/" + "0".repeat(LEAGUE_ID_LENGTH)
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("should show league content", async () => {
      const user = getTestUser({ name: "Some User" });
      mockUser({ state: UserState.LOGGED_USER, user });
      const { asFragment } = await renderComponentSleep(
        "/leagues/" + "0".repeat(LEAGUE_ID_LENGTH)
      );
      expect(asFragment()).toMatchSnapshot();
    });

    it("should show other user team if clicked", async () => {
      const players: Player[] = [
        {
          id: 0,
          firstName: "Ronald",
          lastName: "Araujo",
          role: "DEF",
          team: "Barcelona",
        },
      ];
      const appUser = getTestUser({ name: "Signed In User", players });
      mockUser({ state: UserState.LOGGED_USER, user: appUser });

      const { asFragment, user } = await renderComponentSleep(
        "/leagues/" + "0".repeat(LEAGUE_ID_LENGTH)
      );

      const rows = await screen.findAllByRole("row");
      const firstRender = asFragment();
      expect(firstRender).toMatchSnapshot();
      await clickElement(user, rows[2]);

      const secondRender = asFragment();
      expect(firstRender).not.toEqual(secondRender);
      expect(secondRender).toMatchSnapshot();
    });
  });
});

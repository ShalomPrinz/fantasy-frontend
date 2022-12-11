import {
  clickElement,
  getTestUser,
  mockUser,
  renderEffects,
  renderEffectsSleep,
  screen,
  setWindowSize,
} from "setupTests";

import { FIELD_LAYOUT_MIN_WIDTH } from "../../../constants";
import { UserState } from "../../../contexts";
import { Player } from "../../../types";
import UserTeam from "../UserTeam";

const player: Player = {
  id: 0,
  firstName: "",
  lastName: "Messi",
  role: "ATT",
  team: "Barcelona",
};

const renderComponent = async () => await renderEffects(<UserTeam />, true);
const renderComponentSleep = async () =>
  await renderEffectsSleep(<UserTeam />, true);

describe("UserTeam", () => {
  it("should render UserTeam component", async () => {
    const user = getTestUser({ name: "Some Name", players: [player] });
    mockUser({ user });

    const { asFragment } = await renderComponentSleep();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render a proper message if no user is logged in", async () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = await renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render a proper message if loading user", async () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = await renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not allow field layout if window size is smaller than minimum", async () => {
    const appUser = getTestUser({ name: "Some Name", players: [player] });
    mockUser({ user: appUser });

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH - 1);
    const { asFragment, user } = await renderComponentSleep();
    const firstRender = asFragment();

    const element = screen.getByRole("button", { name: /Field/i });
    await clickElement(user, element);

    expect(asFragment()).toEqual(firstRender);
  });
});

import {
  clickElement,
  getTestUser,
  mockUser,
  render,
  screen,
  setWindowSize,
  sleep,
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

describe("UserTeam", () => {
  it("should render UserTeam component", async () => {
    const user = getTestUser("Some Name", [player]);
    mockUser({ user });

    const { asFragment } = render(<UserTeam />);
    await sleep();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render a proper message if no user is logged in", () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = render(<UserTeam />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render a proper message if loading user", () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = render(<UserTeam />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not allow field layout if window size is smaller than minimum", async () => {
    const appUser = getTestUser("Some Name", [player]);
    mockUser({ user: appUser });

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH - 1);
    const { asFragment, user } = render(<UserTeam />);
    await sleep();
    const firstRender = asFragment();

    const element = screen.getByRole("button", { name: /Field/i });
    await clickElement(user, element);

    expect(asFragment()).toEqual(firstRender);
  });
});

import {
  clickElement,
  mockUser,
  renderQueryClient,
  screen,
  setWindowSize,
  sleep,
} from "setupTests";

import { FIELD_LAYOUT_MIN_WIDTH } from "../../../constants";
import { UserState } from "../../../contexts";
import { Player, Team, User } from "../../../types";
import UserTeam from "../UserTeam";

describe("UserTeam", () => {
  it("should render UserTeam component", async () => {
    const players: Player[] = [
      { id: 0, name: "Messi", role: "ATT", team: "Barcelona" },
    ];
    const user = new User("Some Name", new Team(players));
    mockUser({ user });

    const { asFragment } = renderQueryClient(<UserTeam />);
    await sleep();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render a proper message if no user is logged in", () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = renderQueryClient(<UserTeam />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render a proper message if loading user", () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = renderQueryClient(<UserTeam />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should not allow field layout if window size is smaller than minimum", async () => {
    const players: Player[] = [
      { id: 0, name: "Messi", role: "ATT", team: "Barcelona" },
    ];
    const appUser = new User("Some Name", new Team(players));
    mockUser({ user: appUser });

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH - 1);
    const { asFragment, user } = renderQueryClient(<UserTeam />);
    await sleep();
    const firstRender = asFragment();

    const element = screen.getByRole("button", { name: /Field/i });
    await clickElement(user, element);

    expect(asFragment()).toEqual(firstRender);
  });
});

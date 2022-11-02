import {
  clickElement,
  renderQueryClient,
  screen,
  setWindowSize,
  sleep,
} from "setupTests";

import { FIELD_LAYOUT_MIN_WIDTH } from "../../../constants";
import { Player, Team, User } from "../../../types";
import UserTeam from "../UserTeam";

describe("UserTeam", () => {
  it("should render UserTeam component", async () => {
    const players: Player[] = [
      { id: 0, name: "Messi", role: "ATT", team: "Barcelona" },
    ];
    const user = new User("Some Name", new Team(players));

    const { asFragment } = renderQueryClient(<UserTeam user={user} />);
    await sleep();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not allow field layout if window size is smaller than minimum", async () => {
    const players: Player[] = [
      { id: 0, name: "Messi", role: "ATT", team: "Barcelona" },
    ];
    const appUser = new User("Some Name", new Team(players));

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH - 1);
    const { asFragment, user } = renderQueryClient(<UserTeam user={appUser} />);
    await sleep();
    const firstRender = asFragment();

    const element = screen.getByRole("button", { name: /Field/i });
    await clickElement(user, element);

    expect(asFragment()).toEqual(firstRender);
  });
});

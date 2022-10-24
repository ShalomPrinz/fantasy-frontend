import Team from "classes/Team";
import User from "classes/User";
import { Player } from "interfaces";
import { clickElement, render, screen, setWindowSize } from "setupTests";

import { FIELD_LAYOUT_MIN_WIDTH } from "../../../constants";
import UserTeam from "../UserTeam";

describe("UserTeam", () => {
  it("should render UserTeam component", () => {
    const players: Player[] = [
      { id: 0, name: "Messi", role: "ATT", team: "Barcelona" },
    ];
    const user = new User("Some Name", new Team(players));

    const { asFragment } = render(<UserTeam user={user} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not allow field layout if window size is smaller than minimum", async () => {
    const players: Player[] = [
      { id: 0, name: "Messi", role: "ATT", team: "Barcelona" },
    ];
    const appUser = new User("Some Name", new Team(players));

    setWindowSize(FIELD_LAYOUT_MIN_WIDTH - 1);
    const { asFragment, user } = render(<UserTeam user={appUser} />);
    const firstRender = asFragment();

    const element = screen.getByRole("button", { name: /Field/i });
    await clickElement(user, element);

    expect(asFragment()).toEqual(firstRender);
  });
});

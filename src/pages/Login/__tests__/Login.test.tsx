import { UserState } from "contexts";
import { mockUser, renderWithRouterAndUser } from "setupTests";

import Login from "../Login";

const renderComponent = () => renderWithRouterAndUser(<Login />);

describe("Login", () => {
  it("should render Login component if loading user", () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Login component if user is logged in", () => {
    mockUser({ state: UserState.LOGGED_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Login component if no user is logged in", () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

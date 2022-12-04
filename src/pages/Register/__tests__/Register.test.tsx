import { UserState } from "contexts";
import { mockUser, renderWithRouterAndUser } from "setupTests";

import Register from "../Register";

const renderComponent = () => renderWithRouterAndUser(<Register />);

describe("Register", () => {
  it("should render Register component if loading user", () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Register component if user is logged in", () => {
    mockUser({ state: UserState.LOGGED_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Register component if no user is logged in", () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});

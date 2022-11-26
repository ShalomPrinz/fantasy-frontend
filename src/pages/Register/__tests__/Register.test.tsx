import { UserProvider, UserState } from "contexts";
import { BrowserRouter } from "react-router-dom";
import { mockUser, renderQueryClient } from "setupTests";

import Register from "../Register";

const RegisterComponent = (
  <BrowserRouter>
    <UserProvider>
      <Register />
    </UserProvider>
  </BrowserRouter>
);

describe("Register", () => {
  it("should render Register component if loading user", () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = renderQueryClient(RegisterComponent);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Register component if user is logged in", () => {
    mockUser({ state: UserState.LOGGED_USER });
    const { asFragment } = renderQueryClient(RegisterComponent);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Register component if no user is logged in", () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = renderQueryClient(RegisterComponent);
    expect(asFragment()).toMatchSnapshot();
  });
});

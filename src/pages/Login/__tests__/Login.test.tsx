import { UserProvider, UserState } from "contexts";
import { BrowserRouter } from "react-router-dom";
import { mockUser, renderQueryClient } from "setupTests";

import Login from "../Login";

const LoginComponent = (
  <BrowserRouter>
    <UserProvider>
      <Login />
    </UserProvider>
  </BrowserRouter>
);

describe("Login", () => {
  it("should render Login component if loading user", () => {
    mockUser({ state: UserState.LOADING_USER });
    const { asFragment } = renderQueryClient(LoginComponent);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Login component if user is logged in", () => {
    mockUser({ state: UserState.LOGGED_USER });
    const { asFragment } = renderQueryClient(LoginComponent);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Login component if no user is logged in", () => {
    mockUser({ state: UserState.NO_LOGGED_USER });
    const { asFragment } = renderQueryClient(LoginComponent);
    expect(asFragment()).toMatchSnapshot();
  });
});

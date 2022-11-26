import { UserProvider } from "contexts";
import { BrowserRouter } from "react-router-dom";
import { clickElement, mockUser, render, screen } from "setupTests";
import { Team, User } from "types";

import NavBar from "../NavBar";

const Component = (
  <BrowserRouter>
    <UserProvider>
      <NavBar />
    </UserProvider>
  </BrowserRouter>
);

describe("NavBar", () => {
  it("should render NavBar component", () => {
    const { asFragment } = render(Component);
    expect(asFragment()).toMatchSnapshot();
  });

  describe("User is logged in", () => {
    it("should render other navbar menu", () => {
      const user = new User("Test User", new Team([]));
      const unmockUser = mockUser({ user });
      const { asFragment } = render(Component);
      expect(asFragment()).toMatchSnapshot();
      unmockUser();
    });

    it("should call logout function from user context on menu logout selection", async () => {
      const logoutFn = jest.fn();
      const appUser = new User("Test User", new Team([]));
      const unmockUser = mockUser({ user: appUser, logout: logoutFn });

      const { user } = render(Component);
      const menuLogout = screen.getByRole("link", { name: /Logout/i });
      await clickElement(user, menuLogout);

      expect(logoutFn).toBeCalled();
      unmockUser();
    });
  });

  describe("when navbar expands", () => {
    it("should change navbar layout", async () => {
      const { user, asFragment } = render(Component);

      expect(asFragment()).toMatchSnapshot();

      const element = screen.getByRole("button");
      await clickElement(user, element);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should allow collapse via main link", async () => {
      const { user, asFragment } = render(Component);

      const firstRender = asFragment();
      expect(firstRender).toMatchSnapshot();

      const mainLink = screen.getAllByRole("link")[0];
      await clickElement(user, mainLink);

      expect(asFragment()).toEqual(firstRender);

      const toggleButton = screen.getByRole("button");
      await clickElement(user, toggleButton);

      expect(asFragment()).not.toEqual(firstRender);

      await clickElement(user, mainLink);

      // This differs a little from firstRender
      expect(asFragment()).toMatchSnapshot();
    });
  });
});

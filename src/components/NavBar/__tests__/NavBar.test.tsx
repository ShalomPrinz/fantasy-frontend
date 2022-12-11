import {
  clickElement,
  getTestUser,
  mockUser,
  renderWithRouterAndUser,
  screen,
} from "setupTests";

import NavBar from "../NavBar";

const renderComponent = () => renderWithRouterAndUser(<NavBar />);

describe("NavBar", () => {
  it("should render NavBar component", () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  describe("User is logged in", () => {
    it("should render other navbar menu", () => {
      const user = getTestUser({ name: "Test User" });
      const unmockUser = mockUser({ user });
      const { asFragment } = renderComponent();
      expect(asFragment()).toMatchSnapshot();
      unmockUser();
    });

    it("should call logout function from user context on menu logout selection", async () => {
      const logoutFn = jest.fn();
      const appUser = getTestUser({ name: "Test User" });
      const unmockUser = mockUser({ user: appUser, logout: logoutFn });

      const { user } = renderComponent();
      const menuLogout = screen.getByRole("link", { name: /Logout/i });
      await clickElement(user, menuLogout);

      expect(logoutFn).toBeCalled();
      unmockUser();
    });
  });

  describe("when navbar expands", () => {
    it("should change navbar layout", async () => {
      const { user, asFragment } = renderComponent();

      expect(asFragment()).toMatchSnapshot();

      const element = screen.getByRole("button");
      await clickElement(user, element);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should allow collapse via main link", async () => {
      const { user, asFragment } = renderComponent();

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

import { BrowserRouter } from "react-router-dom";
import { clickElement, render, screen } from "setupTests";

import NavBar from "../NavBar";

const Component = (
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>
);

describe("NavBar", () => {
  it("should render NavBar component", () => {
    const { asFragment } = render(Component);

    expect(asFragment()).toMatchSnapshot();
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

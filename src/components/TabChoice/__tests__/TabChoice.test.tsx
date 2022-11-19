import { clickElement, render, screen } from "setupTests";

import TabChoice from "../TabChoice";

interface Tab {
  id: number;
  disabled?: {
    condition: () => boolean;
    toast: string;
  };
  label: string;
  Component: JSX.Element;
}

describe("TabChoice", () => {
  it("should render empty div", () => {
    const tabs: Tab[] = [];

    const { asFragment } = render(<TabChoice tabs={tabs} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render TabChoice component", () => {
    const tabs = [{ id: 0, label: "One", Component: <h1>Hello</h1> }];

    const { asFragment } = render(<TabChoice tabs={tabs} />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("when tab is clicked", () => {
    it("should show the clicked tab component", async () => {
      const tabs = [
        { id: 0, label: "One", Component: <h1>Hello</h1> },
        { id: 1, label: "Two", Component: <h1>World</h1> },
      ];

      const { user, asFragment } = render(<TabChoice tabs={tabs} />);

      expect(asFragment()).toMatchSnapshot();

      const element = screen.getByText("Two");
      await clickElement(user, element);
      expect(asFragment()).toMatchSnapshot();
    });

    it("should not show clicked tab when its disabled", async () => {
      const tabs = [
        {
          id: 0,
          label: "One",
          Component: <h1>Hello</h1>,
        },
        {
          id: 1,
          disabled: {
            condition: () => true,
            toast: "Toast",
          },
          label: "Two",
          Component: <h1>Hello</h1>,
        },
      ];

      const { user, asFragment } = render(<TabChoice tabs={tabs} />);

      const firstRender = asFragment();

      const element = screen.getByText("Two");
      await clickElement(user, element);
      expect(asFragment()).toEqual(firstRender);
    });
  });
});

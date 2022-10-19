import { clickButton, render, screen } from "setupTests";

import TabChoice from "../TabChoice";

interface Tab {
  id: number;
  label: string;
  Component: JSX.Element;
  onClick?: Function;
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
      await clickButton(user, element);
      expect(asFragment()).toMatchSnapshot();
    });

    it("should call given onClick prop", async () => {
      const onClick = jest.fn();
      const tabs = [
        { id: 0, label: "One", Component: <h1>Hello</h1>, onClick: onClick },
      ];

      const { user } = render(<TabChoice tabs={tabs} />);
      const element = screen.getByText("One");
      await clickButton(user, element);

      expect(onClick).toBeCalledTimes(1);
    });
  });
});

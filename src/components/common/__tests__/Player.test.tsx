import { hoverElement, render, screen, unhoverElement } from "setupTests";

import { Player } from "../..";

describe("Player", () => {
  it("should render Player component", () => {
    const { asFragment } = render(
      <Player name="Shalom" team="Dortmund" width={10} widthUnits="px" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("Hover", () => {
    it("should show full player name on hover", async () => {
      const { asFragment, user } = render(
        <Player
          name="Robert Lewandowski"
          team="Dortmund"
          width={10}
          widthUnits="px"
        />
      );

      const firstRender = asFragment();
      const element = screen.getByText(/Robert/i);
      await hoverElement(user, element);

      expect(firstRender).not.toEqual(asFragment());
      expect(asFragment()).toMatchSnapshot();
    });

    it("should get back to normal when hover stops", async () => {
      const { asFragment, user } = render(
        <Player
          name="Robert Lewandowski"
          team="Dortmund"
          width={10}
          widthUnits="px"
        />
      );

      const firstRender = asFragment();
      const element = screen.getByText(/Robert/i);

      await hoverElement(user, element);
      expect(firstRender).not.toEqual(asFragment());

      await unhoverElement(user, element);
      expect(firstRender).toEqual(asFragment());
    });
  });
});

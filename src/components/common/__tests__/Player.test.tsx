import { render } from "setupTests";

import { Player } from "../..";

describe("Player", () => {
  it("should render Player component", () => {
    const { asFragment } = render(
      <Player name="Shalom" team="Dortmund" width={10} widthUnits="px" />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});

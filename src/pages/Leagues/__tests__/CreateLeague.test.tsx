import { renderWithRouterAndUser } from "setupTests";

import CreateLeague from "../CreateLeague";

describe("CreateLeague", () => {
  it("should render CreateLeague component", () => {
    const { asFragment } = renderWithRouterAndUser(<CreateLeague />);

    expect(asFragment()).toMatchSnapshot();
  });
});

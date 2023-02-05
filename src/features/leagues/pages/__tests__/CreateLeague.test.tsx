import { mockUserUndefined, renderWithRouterAndUser } from "setupTests";

import CreateLeague from "../CreateLeague";

describe("CreateLeague", () => {
  it("should render CreateLeague component", () => {
    const { asFragment } = renderWithRouterAndUser(<CreateLeague />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should cause uncaught error and render Error Boundary", () => {
    const unmockUser = mockUserUndefined();

    const { asFragment } = renderWithRouterAndUser(<CreateLeague />);

    expect(asFragment()).toMatchSnapshot();
    unmockUser();
  });
});

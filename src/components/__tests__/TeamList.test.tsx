import { render } from "setupTests";

import { TeamList } from "../";

describe("TeamList", () => {
  it("should render TeamList component", () => {
    const team = [
      {
        id: 0,
        label: "GK",
        players: [{ id: 0, name: "Ter Stegen", team: "Barcelona" }],
      },
    ];

    const { asFragment } = render(<TeamList team={team} />);

    expect(asFragment()).toMatchSnapshot();
  });
});

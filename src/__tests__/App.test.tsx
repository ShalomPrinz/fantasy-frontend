import { render } from "setupTests";

import App from "../App";

describe("App", () => {
  it("should render App component", () => {
    const { asFragment } = render(<App />);

    expect(asFragment()).toMatchSnapshot();
  });
});

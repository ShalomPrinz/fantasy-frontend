import { render, screen, typeElement } from "setupTests";

import { Search } from "../";

describe("Search", () => {
  it("should render Search component", () => {
    const value = "";
    const onChange = () => {};

    const { asFragment } = render(<Search onChange={onChange} value={value} />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("when input changes", () => {
    it("should call onChange with the new input as argument", async () => {
      let value = "";
      const onChange = (v: string) => (value += v);
      const { user } = render(<Search onChange={onChange} value={value} />);

      const element = screen.getByRole("textbox");
      const input = "NEW INPUT";
      await typeElement(user, element, input);

      expect(value).toBe(input);
    });
  });
});

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
    it("should call onChange with the new input as argument", () => {
      let value = "";
      const onChange = (v: string) => (value += v);
      render(<Search onChange={onChange} value={value} />);

      const element = screen.getByRole("textbox");
      const input = "NEW INPUT";
      typeElement(element, input);

      expect(value).toBe(input);
    });
  });
});

import { render, screen, typeElement } from "setupTests";

import { Search } from "../";

describe("Search", () => {
  it("should render Search component", () => {
    const { asFragment } = render(<Search onChange={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  describe("when input changes", () => {
    it("should call onChange with the new input as argument", async () => {
      const onChange = jest.fn();
      const { user } = render(<Search onChange={onChange} />);

      const element = screen.getByRole("textbox");
      const input = "NEW INPUT";
      await typeElement(user, element, input);

      expect(onChange).toBeCalledTimes(input.length);
      expect(onChange).toHaveBeenLastCalledWith(input);
    });
  });
});

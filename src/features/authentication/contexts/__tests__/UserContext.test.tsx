import { render } from "setupTests";

import { useUser } from "../";

describe("UserTeamContext", () => {
  it("should throw error when using the context outside of provider", () => {
    jest.spyOn(console, "error").mockImplementation(jest.fn());

    const TestUserComponent = () => {
      useUser();
      return <></>;
    };

    expect(() => render(<TestUserComponent />)).toThrowError();
  });
});

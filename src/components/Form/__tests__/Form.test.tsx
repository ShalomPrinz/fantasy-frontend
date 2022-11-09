import { act, clickElement, render, screen, typeElement } from "setupTests";
import * as Yup from "yup";

import Form from "../Form";

const textInput = [
  {
    id: 0,
    label: "first input",
    name: "firstInput",
    type: "text",
  },
];

describe("Form", () => {
  it("should render Form component", () => {
    const { asFragment } = render(
      <Form
        onSubmit={() => {}}
        schema={Yup.object()}
        submitDisabled={false}
        textInputs={[]}
        title={"Test Form"}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Form component with text input", () => {
    const { asFragment } = render(
      <Form
        onSubmit={() => {}}
        schema={Yup.object()}
        submitDisabled={false}
        textInputs={textInput}
        title={"Test Form"}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe("when user inserts input", () => {
    it("should validate values and report errors according to the given schema", async () => {
      const minChars = 5;
      const errorMessage = `Must be at least ${minChars} characters`;

      const { user } = render(
        <Form
          onSubmit={() => {}}
          schema={Yup.object({
            firstInput: Yup.string().min(minChars, errorMessage),
          })}
          submitDisabled={false}
          textInputs={textInput}
          title={"Test Form"}
        />
      );

      let errorElement = screen.queryByText(errorMessage);
      expect(errorElement).toBe(null);

      const input = screen.getByRole("textbox");
      await typeElement(user, input, "a".repeat(minChars - 1));
      act(() => input.blur());

      errorElement = screen.queryByText(errorMessage);
      expect(errorElement).toBeInTheDocument();

      await typeElement(user, input, "a".repeat(minChars));

      errorElement = screen.queryByText(errorMessage);
      expect(errorElement).toBe(null);
    });
  });

  describe("when user submits form", () => {
    it("should call onSubmit with the user inserted values", async () => {
      let value = {
        firstInput: "",
      };

      const { user } = render(
        <Form
          onSubmit={(v) => {
            // @ts-ignore
            value = v;
          }}
          schema={Yup.object()}
          submitDisabled={false}
          textInputs={textInput}
          title={"Test Form"}
        />
      );

      const inputString = "SOME INPUT";

      const input = screen.getByRole("textbox");
      await typeElement(user, input, inputString);

      expect(value.firstInput).toEqual("");

      const submitButton = screen.getByRole("button");
      await clickElement(user, submitButton);

      expect(value.firstInput).toEqual(inputString);
    });

    it("should not allow submit if submit is disabled", async () => {
      let value = {
        firstInput: "",
      };

      const { user } = render(
        <Form
          onSubmit={(v) => {
            // @ts-ignore
            value = v;
          }}
          schema={Yup.object()}
          submitDisabled={true}
          textInputs={textInput}
          title={"Test Form"}
        />
      );

      const inputString = "SOME INPUT";

      const input = screen.getByRole("textbox");
      await typeElement(user, input, inputString);

      expect(value.firstInput).toEqual("");

      const submitButton = screen.getByRole("button");
      await clickElement(user, submitButton);

      expect(value.firstInput).toEqual("");
    });
  });
});

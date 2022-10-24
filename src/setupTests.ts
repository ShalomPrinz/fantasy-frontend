// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { ReactElement } from "react";

import { render as renderToScreen, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

const render = (Component: ReactElement) => ({
  ...renderToScreen(Component),
  user: userEvent.setup(),
});

const setProperty = (obj: Object, prop: string, value: number) =>
  Object.defineProperty(obj, prop, {
    writable: true,
    configurable: true,
    value: value,
  });

const setWindowSize = (value: number) =>
  setProperty(window, "innerWidth", value);

const clickElement = (user: UserEvent, element: HTMLElement) =>
  user.click(element);

const typeElement = (user: UserEvent, element: HTMLElement, input: string) =>
  user.type(element, input);

export {
  clickElement,
  render,
  screen,
  setProperty,
  setWindowSize,
  typeElement,
};

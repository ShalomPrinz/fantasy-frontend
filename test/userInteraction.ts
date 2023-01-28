import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

const clickElement = (user: UserEvent, element: HTMLElement) =>
  user.click(element);

const typeElement = (user: UserEvent, element: HTMLElement, input: string) =>
  user.type(element, input);

const hoverElement = (user: UserEvent, element: HTMLElement) =>
  user.hover(element);

const unhoverElement = (user: UserEvent, element: HTMLElement) =>
  user.unhover(element);

export { clickElement, hoverElement, typeElement, unhoverElement };

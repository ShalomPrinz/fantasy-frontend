import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";

const clickElement = (user: UserEvent, element: HTMLElement) =>
  user.click(element);

const typeElement = (user: UserEvent, element: HTMLElement, input: string) =>
  user.type(element, input);

export { clickElement, typeElement };

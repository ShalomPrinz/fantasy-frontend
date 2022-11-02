import { ReactElement } from "react";

import { render as renderToScreen, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const render = (Component: ReactElement) => ({
  ...renderToScreen(Component),
  user: userEvent.setup(),
});

export { render, screen };
export { setProperty, setWindowSize } from "./setConstants";
export { sleep } from "./time";
export { clickElement, typeElement } from "./userInteraction";
export { renderQueryClient } from "./queryClient";
export { handlers } from "./serverHandlers";

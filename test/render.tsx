import { ReactElement } from "react";

import { render as renderToScreen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserProvider } from "contexts";
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { sleep } from "./time";

const render = (Component: ReactElement) => ({
  ...renderToScreen(Component),
  user: userEvent.setup(),
});

const renderWithRouterAndUser = (Component: ReactElement, path?: string) => {
  const routePath = path || "/";
  const initialEntries = [routePath];

  const router = createMemoryRouter(
    createRoutesFromElements(<Route path={routePath} element={Component} />),
    {
      initialEntries,
    }
  );

  return render(
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

const renderEffects = async (
  Component: ReactElement,
  simpleRender?: boolean,
  path?: string
) =>
  await waitFor(async () =>
    simpleRender ? render(Component) : renderWithRouterAndUser(Component, path)
  );

const renderEffectsSleep = async (
  Component: ReactElement,
  simpleRender?: boolean,
  path?: string
) =>
  await waitFor(async () => {
    const result = simpleRender
      ? render(Component)
      : renderWithRouterAndUser(Component, path);
    await sleep();
    return result;
  });

export { render, renderEffects, renderEffectsSleep, renderWithRouterAndUser };

import { ReactElement } from "react";

import { render as renderToScreen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserProvider } from "contexts";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const render = (Component: ReactElement) => ({
  ...renderToScreen(Component),
  user: userEvent.setup(),
});

const renderWithRouterAndUser = (Component: ReactElement) => {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={Component} />)
  );

  return render(
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
};

export { render, renderWithRouterAndUser };

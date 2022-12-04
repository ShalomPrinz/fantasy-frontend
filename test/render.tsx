import { ReactElement } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render as renderToScreen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const render = (Component: ReactElement) => ({
  ...renderToScreen(Component),
  user: userEvent.setup(),
});

const renderQueryClient = (Component: ReactElement) => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{Component}</QueryClientProvider>
  );
};

export { render, renderQueryClient };

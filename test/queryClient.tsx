import { ReactElement } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { render } from "./index";

export const renderQueryClient = (Component: ReactElement) => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>{Component}</QueryClientProvider>
  );
};

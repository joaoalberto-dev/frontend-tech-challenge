import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions, within } from "@testing-library/react";
import { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";

const customScreen = within(document.body);
const customWithin = (element: HTMLElement) => within(element);
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) =>
  render(ui, {
    wrapper: ({ children }) => {
      const client = new QueryClient();
      return (
        <QueryClientProvider client={client}>
          <MemoryRouter>{children}</MemoryRouter>
        </QueryClientProvider>
      );
    },
    ...options,
  });

export * from "@testing-library/react";
export {
  customRender as render,
  customScreen as screen,
  customWithin as within,
};

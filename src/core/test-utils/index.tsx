import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, within, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

const customScreen = within(document.body);
const customWithin = (element: HTMLElement) => within(element);
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) =>
  render(ui, {
    wrapper: ({ children }) => {
      const client = new QueryClient();
      return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      );
    },
    ...options,
  });

export * from "@testing-library/react";
export {
  customScreen as screen,
  customWithin as within,
  customRender as render,
};

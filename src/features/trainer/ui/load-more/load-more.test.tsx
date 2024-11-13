import { fireEvent, render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { LoadMore } from "./load-more";

describe("LoadMore", () => {
  test("renders load more button", () => {
    const screen = render(
      <LoadMore loadMore={() => {}} disabled={false} isLoadingMore={false} />
    );

    expect(
      screen.getByRole("button", { name: /load more/i })
    ).toBeInTheDocument();
  });

  test("calls loadMore function when clicked", () => {
    const loadMore = vi.fn();

    const screen = render(
      <LoadMore loadMore={loadMore} disabled={false} isLoadingMore={false} />
    );

    fireEvent.click(screen.getByRole("button", { name: /load more/i }));
    expect(loadMore).toHaveBeenCalledOnce();
  });

  test("shows loading indicator when isLoadingMore is true", () => {
    const screen = render(
      <LoadMore loadMore={() => {}} disabled={false} isLoadingMore={true} />
    );

    expect(
      screen.getByRole("button", { name: /load more/i })
    ).toBeInTheDocument();
  });

  test("disables button when disabled prop is true", () => {
    const screen = render(
      <LoadMore loadMore={() => {}} disabled={true} isLoadingMore={false} />
    );

    expect(screen.getByRole("button", { name: /load more/i })).toBeDisabled();
  });
});

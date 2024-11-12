import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Search } from "./search";

describe("Search", () => {
  it("renders with default value", () => {
    const onChange = vi.fn();
    const screen = render(
      <Search isLoading={false} onChange={onChange} defaultValue="test" />
    );

    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("test");
  });

  it("shows loader icon when loading", () => {
    const onChange = vi.fn();
    const screen = render(
      <Search isLoading={true} onChange={onChange} defaultValue="" />
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("shows search icon when not loading", () => {
    const onChange = vi.fn();
    const screen = render(
      <Search isLoading={false} onChange={onChange} defaultValue="" />
    );

    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("calls onChange when input value changes", () => {
    const onChange = vi.fn();
    const screen = render(
      <Search isLoading={false} onChange={onChange} defaultValue="" />
    );

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(onChange).toHaveBeenCalled();
  });
});

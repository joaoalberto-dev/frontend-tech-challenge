import { act, renderHook } from "@testing-library/react";
import { ChangeEvent } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import { usePokeTrainerSearch } from "./use-poke-trainer-search";

vi.mock("@/core/hooks/use-debounce-callback", () => ({
  useDebounceCallback: (callback: Function) => callback,
}));

describe("usePokeTrainerSearch", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );

  test("should return empty name when no search params exist", () => {
    const { result } = renderHook(() => usePokeTrainerSearch(), { wrapper });

    expect(result.current.name).toBe("");
  });

  test("should return name from search params", () => {
    const { result } = renderHook(() => usePokeTrainerSearch(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/?name=morty"]}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(result.current.name).toBe("morty");
  });

  test("should update search params when handleChange is called", () => {
    const { result } = renderHook(() => usePokeTrainerSearch(), { wrapper });

    act(() => {
      result.current.handleChange("morty");
    });

    expect(result.current.name).toBe("morty");
  });
});

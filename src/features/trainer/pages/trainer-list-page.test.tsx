import { render, screen } from "@/core/test-utils";
import { fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePokeTrainerFetch } from "../hooks/use-poke-trainer-fetch";
import { useFlatPokeTrainers } from "../hooks/use-poke-trainer-flat";
import { usePokeTrainerSearch } from "../hooks/use-poke-trainer-search";
import { PokeTrainerListPage } from "./trainer-list-page";

vi.mock("../hooks/use-poke-trainer-fetch");
vi.mock("../hooks/use-poke-trainer-search");
vi.mock("../hooks/use-poke-trainer-flat");

describe("PokeTrainerListPage", () => {
  const mockLoadMore = vi.fn();

  const defaultMockData = {
    name: "",
    handleChange: vi.fn(),
    data: [],
    loadMore: mockLoadMore,
    hasMore: true,
    isLoading: false,
    characters: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();

    (usePokeTrainerSearch as any).mockReturnValue({
      name: defaultMockData.name,
      handleChange: defaultMockData.handleChange,
    });

    (usePokeTrainerFetch as any).mockReturnValue({
      data: defaultMockData.data,
      loadMore: defaultMockData.loadMore,
      hasMore: defaultMockData.hasMore,
      isLoading: defaultMockData.isLoading,
    });

    (useFlatPokeTrainers as any).mockReturnValue(defaultMockData.characters);
  });

  test("renders the header with correct title", () => {
    render(<PokeTrainerListPage />);
    expect(screen.getByText("Pick your champion")).toBeInTheDocument();
  });

  test("shows empty state when no characters are found", () => {
    render(<PokeTrainerListPage />);
    expect(screen.getByText("No trainers found.")).toBeInTheDocument();
  });

  test("renders list of characters when data is available", () => {
    const mockCharacters = [
      { id: "1", name: "Ash", image: "ash.jpg" },
      { id: "2", name: "Misty", image: "misty.jpg" },
    ];

    (useFlatPokeTrainers as any).mockReturnValue(mockCharacters);

    render(<PokeTrainerListPage />);

    expect(screen.getByText("Ash")).toBeInTheDocument();
    expect(screen.getByText("Misty")).toBeInTheDocument();
  });

  test("load more button is disabled when loading", () => {
    (usePokeTrainerFetch as any).mockReturnValue({
      ...defaultMockData,
      isLoading: true,
      hasMore: true,
    });

    const mockCharacters = [{ id: "1", name: "Ash", image: "ash.jpg" }];
    (useFlatPokeTrainers as any).mockReturnValue(mockCharacters);

    render(<PokeTrainerListPage />);

    const loadMoreButton = screen.getByRole("button");
    expect(loadMoreButton).toBeDisabled();
  });

  test("load more button is disabled when no more data", () => {
    (usePokeTrainerFetch as any).mockReturnValue({
      ...defaultMockData,
      hasMore: false,
    });

    const mockCharacters = [{ id: "1", name: "Ash", image: "ash.jpg" }];
    (useFlatPokeTrainers as any).mockReturnValue(mockCharacters);

    render(<PokeTrainerListPage />);

    const loadMoreButton = screen.getByRole("button");
    expect(loadMoreButton).toBeDisabled();
  });

  test("calls loadMore when load more button is clicked", () => {
    const mockCharacters = [{ id: "1", name: "Ash", image: "ash.jpg" }];
    (useFlatPokeTrainers as any).mockReturnValue(mockCharacters);

    render(<PokeTrainerListPage />);

    const loadMoreButton = screen.getByRole("button");
    fireEvent.click(loadMoreButton);

    expect(mockLoadMore).toHaveBeenCalledTimes(1);
  });
});

import { RickAndMortyResponse } from "@/core/services/rick-and-morty.types";
import { InfiniteData } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useFlatPokeTrainers } from "./use-poke-trainer-flat";

describe("useFlatPokeTrainers", () => {
  test("should return empty array when data is undefined", () => {
    const { result } = renderHook(() => useFlatPokeTrainers(undefined));
    expect(result.current).toEqual([]);
  });

  test("should flatten multiple pages of trainers into a single array", () => {
    const mockData = {
      pages: [
        {
          info: {
            count: 2,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [
            { id: 1, name: "Rick", status: "Alive", species: "Human" },
            { id: 2, name: "Morty", status: "Alive", species: "Human" },
          ],
        },
        {
          info: {
            count: 2,
            pages: 1,
            next: null,
            prev: null,
          },
          results: [
            { id: 3, name: "Summer", status: "Alive", species: "Human" },
            { id: 4, name: "Beth", status: "Alive", species: "Human" },
          ],
        },
      ],
      pageParams: [],
    } as unknown as InfiniteData<RickAndMortyResponse, unknown>;

    const { result } = renderHook(() => useFlatPokeTrainers(mockData));

    expect(result.current).toHaveLength(4);
    expect(result.current).toEqual([
      { id: 1, name: "Rick", status: "Alive", species: "Human" },
      { id: 2, name: "Morty", status: "Alive", species: "Human" },
      { id: 3, name: "Summer", status: "Alive", species: "Human" },
      { id: 4, name: "Beth", status: "Alive", species: "Human" },
    ]);
  });
});

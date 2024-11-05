import { describe, test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useBattleManager } from "./use-battle-manager";

vi.mock("@/features/poke-trainer-detail/context/favorite-pokemon", () => ({
  useFavoritePokemon: () => ({
    replace: vi.fn(),
    list: vi.fn().mockReturnValue([["1", { name: "Pikachu" }]]),
  }),
}));

vi.mock("./use-random-pokemons", () => ({
  useRandomPokemons: () => ({
    getRandomPokemons: vi.fn().mockResolvedValue([{ name: "Charizard" }]),
  }),
}));

vi.mock("react-router-dom", () => ({
  useLoaderData: () => ({
    trainers: { info: { count: 10 } },
    types: [{ name: "fire" }],
  }),
  useNavigate: () => vi.fn(),
}));

vi.mock("../utils/battle", () => ({
  teamBattle: vi.fn().mockReturnValue({ winner: "player1" }),
}));

describe("useBattleManager", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should initialize with null battle result", () => {
    const { result } = renderHook(() => useBattleManager());

    expect(result.current.battleResult).toBeNull();
  });

  test("handleRandomPokemons should not do anything if no id is provided", async () => {
    const { result } = renderHook(() => useBattleManager());

    await act(async () => {
      await result.current.handleRandomPokemons();
    });

    expect(result.current.battleResult).toBeNull();
  });

  test("startBattle should set battle result when valid ids are provided", () => {
    const { result } = renderHook(() => useBattleManager());

    act(() => {
      result.current.startBattle("1", "2");
    });

    expect(result.current.battleResult).toEqual({ winner: "player1" });
  });

  test("resetBattle should clear battle result and request new random pokemons", () => {
    const { result } = renderHook(() => useBattleManager());

    act(() => {
      result.current.startBattle("1", "2");
    });

    expect(result.current.battleResult).toEqual({ winner: "player1" });

    act(() => {
      result.current.resetBattle("1");
    });

    expect(result.current.battleResult).toBeNull();
  });

  test("handleRandomTrainer should navigate and trigger random pokemon selection", () => {
    const { result } = renderHook(() => useBattleManager());

    act(() => {
      result.current.handleRandomTrainer();
    });

    expect(result.current.battleResult).toBeNull();
  });
});

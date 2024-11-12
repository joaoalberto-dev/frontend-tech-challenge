import { RootLayout } from "@/core/components/layout";
import { Battle } from "@/features/battle/ui/page";
import { PokeTrainerDetail } from "@/features/poke-trainer-detail/ui/page";
import { getPokeTrainers } from "@/features/poke-trainer-list/data/get-poke-trainers";
import { PokeTrainerListPage } from "@/features/poke-trainer-list/ui/page.tsx";
import { pokemonListLoader } from "@/features/pokemon/data/pokemon-list-loader";
import { pokemonTypesListLoader } from "@/features/pokemon/data/pokemon-types-list-loader";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: pokemonListLoader,
    children: [
      {
        index: true,
        element: <PokeTrainerListPage />,
      },
      {
        path: "/:id",
        element: <PokeTrainerDetail />,
      },
      {
        path: "/:id/battle/:enemyId?",
        element: <Battle />,
        loader: async () => ({
          trainers: await getPokeTrainers(),
          types: await pokemonTypesListLoader(),
        }),
      },
    ],
  },
]);

export { router, RouterProvider };

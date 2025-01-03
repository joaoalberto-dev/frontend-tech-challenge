import { RootLayout } from "@/core/components/layout";
import { Battle } from "@/features/battle/ui/page";
import { pokemonListLoader } from "@/features/pokemon/data/pokemon-list-loader";
import { pokemonTypesListLoader } from "@/features/pokemon/data/pokemon-types-list-loader";
import { getPokeTrainers } from "@/features/trainer/data/get-poke-trainers";
import { PokeTrainerDetail } from "@/features/trainer/pages/trainer-detail-page";
import { PokeTrainerListPage } from "@/features/trainer/pages/trainer-list-page";
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

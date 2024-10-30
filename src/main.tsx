import "./index.css";

import { PokeTrainerListPage } from "@/features/poke-trainer-list/ui/page.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./core/components/layout";
import { PokeTrainerDetail } from "./features/poke-trainer-detail/ui/page";
import { pokemonListLoader } from "./features/pokemon/data/pokemon-list-loader";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

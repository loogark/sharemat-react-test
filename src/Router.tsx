import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { CharacterProfile } from "./components/CharacterProfile";
import { Characters } from "./components/Characters";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Characters />,
        },
        {
          path: "/character/:id",
          element: <CharacterProfile />,
        },
      ],
    },
  ]);

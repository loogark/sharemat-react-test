import { createBrowserRouter } from "react-router-dom";
import { CharacterProfile, Characters } from "./components";
import { Layout } from "./Layout";

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

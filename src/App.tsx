import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { CharacterProfile, Characters } from "./components";
import { Layout } from "./Layout";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/characters",
          element: <Characters />,
        },
        {
          path: "/character/:id",
          element: <CharacterProfile />,
        },
      ],
    },
  ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

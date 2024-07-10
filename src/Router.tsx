import { createBrowserRouter } from "react-router-dom";

export const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
  {
    path: "/",
    element: <p>hello</p>,
    children: [],
  },
]);

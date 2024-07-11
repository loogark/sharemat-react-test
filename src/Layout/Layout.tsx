import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Layout() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <Navigate to={`/characters`} replace />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

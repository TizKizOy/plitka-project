import { Navigate } from "react-router-dom";
import { ClientPage } from "../../features/client/pages/ClientPage/ClientPage";
import { AdminLogin } from "../../features/auth/pages/AdminLogin/AdminLogin";
import { AdminPanel } from "../../features/admin/pages/AdminPanel/AdminPanel";
import { ProtectedRoute } from "../../features/auth/pages/ProtectedRoute/ProtectedRoute";
import { NotFound } from "../../shared/pages/NotFound/NotFound";

export const routes = [
  {
    path: "/",
    element: <ClientPage />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/refresh",
    element: <Navigate to="/admin" replace />,
  },
  {
    path: "/admin/*",
    element: (
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

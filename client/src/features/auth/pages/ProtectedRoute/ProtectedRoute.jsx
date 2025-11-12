import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../../hooks/useAuthCheck";

export const ProtectedRoute = ({ children }) => {
  const isAuth = useAuthCheck();

  if (isAuth === null) {
    return <h1>Проверка авторизации...</h1>;
  }

  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

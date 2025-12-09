import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import LoaderOverlay from "../../../../shared/components/LoaderOverlay/LoaderOverlay";

export const ProtectedRoute = ({ children }) => {
  const { isAuth, isLoading, apiError } = useAuthCheck();

  if (isLoading) {
    return <LoaderOverlay isLoading={true} />;
  }

  if (isAuth === null) {
    return <h1>Проверка авторизации...</h1>;
  }

  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

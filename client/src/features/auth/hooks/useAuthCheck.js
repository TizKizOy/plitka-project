import { useState, useEffect } from "react";
import { useApi } from "../../../shared/hooks/useApi";

export const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(null);

  const { isLoading, error: apiError, getData } = useApi();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getData("/admin/protected");
        setIsAuth(!!data.admin);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []); 

  return { isAuth, isLoading, apiError };
};

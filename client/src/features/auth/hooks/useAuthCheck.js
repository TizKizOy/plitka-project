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
        if (error.response?.status === 401) {
          setIsAuth(false);
        } else {
          setIsAuth(null);
        }
      }
    };

    checkAuth();
  }, []);

  return { isAuth, isLoading };
};

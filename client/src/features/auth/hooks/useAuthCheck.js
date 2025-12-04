import { useState, useEffect } from "react";
import { useToken } from "../../../shared/hooks/useToken";
import api from '../../../shared/hooks/useAxios'

export const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(null);
  const token = useToken(); 

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        const response = await api.get("/admin/protected");
        setIsAuth(!!response.data.admin);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [token]); 

  return isAuth;
};

import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../shared/utils/apiConfig";
import { useToken } from "../../../shared/hooks/useToken"; 

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
        const response = await axios.get(`${API_URL}/admin/protected`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          withCredentials: true,
        });
        setIsAuth(!!response.data.admin);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [token]); 

  return isAuth;
};

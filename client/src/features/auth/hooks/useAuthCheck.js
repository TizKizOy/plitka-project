import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../shared/utils/apiConfig";

export const useAuthCheck = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/protected`, {
          withCredentials: true,
        });
        setIsAuth(!!response.data.admin);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  return isAuth;
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../shared/utils/apiConfig";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/admin/logout`,
        {},
        { withCredentials: true }
      );
      // document.cookie =
      //   "connect.sid=; Max-Age=0; Path=/; Secure; SameSite=Strict";
      localStorage.removeItem("token");
      navigate("/admin/login");
    } catch (error) {
      setError("Не удалось выйти. Попробуйте позже.");
    }
  };

  return { handleLogout, error };
};

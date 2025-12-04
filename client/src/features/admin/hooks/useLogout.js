import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../shared/hooks/useAxios";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/admin/logout`);
      localStorage.removeItem("token");
      navigate("/admin/login");
    } catch (error) {
      setError("Не удалось выйти. Попробуйте позже.");
    }
  };

  return { handleLogout, error };
};
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../../shared/hooks/useApi";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { isLoading, error: apiError, postData } = useApi();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await postData("/admin/logout");
      localStorage.removeItem("accessToken");
      navigate("/admin/login");
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    }
  };

  return { handleLogout, isLoading, error: apiError };
};

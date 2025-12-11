import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validation";
import api from "../../../shared/hooks/useAxios";

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlerInputChange = (e, name) => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm(data);

    if (!isValid) {
      const firstError = Object.values(errors).find((err) => err !== "");
      setError(firstError || "");
      return;
    }

    setIsLoading(true); 
    try {
      const res = await api.post("/admin/login", data);
      const tmp = res.data;

      if (tmp.accessToken) {
        localStorage.setItem("accessToken", tmp.accessToken);
      }

      navigate("/admin");
    } catch (error) {
      console.error("Ошибка:", error.response?.data?.error || error.message);
      setServerError(error.response?.data?.error || "Ошибка авторизации");
      setError("");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    showPassword,
    data,
    error: error || serverError,
    isLoading, 
    togglePasswordVisibility,
    handlerInputChange,
    handleSubmit,
  };
};

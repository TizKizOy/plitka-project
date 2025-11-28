import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../shared/utils/apiConfig";
import { validateForm } from "../utils/validation";

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
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

    try {
      await axios.post(`${API_URL}/admin/login`, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      navigate("/admin");
    } catch (error) {
      console.error("Ошибка:", error.response?.data?.error || error.message);
      setServerError(error.response?.data?.error || "Ошибка авторизации");
      setError(""); 
    }
  };

  return {
    showPassword,
    data,
    error: error || serverError, 
    togglePasswordVisibility,
    handlerInputChange,
    handleSubmit,
  };
};

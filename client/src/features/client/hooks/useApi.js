import { useState } from "react";
import api from "../../../shared/hooks/useAxios";

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (endpoint, data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post(endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Произошла ошибка при отправке данных."
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, postData };
};

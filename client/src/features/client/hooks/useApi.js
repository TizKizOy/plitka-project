import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../shared/utils/apiConfig";

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (endpoint, data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
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

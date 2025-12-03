import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../shared/utils/apiConfig";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/order`, {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return { orders, setOrders, isLoading, error };
};

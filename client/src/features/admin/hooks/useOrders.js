import { useState, useEffect } from "react";
import { useToken } from "../../../shared/hooks/useToken";
import api from "../../../shared/hooks/useAxios";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useToken();

  const getOrders = async () => {
    try {
      const response = await api.get(`/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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



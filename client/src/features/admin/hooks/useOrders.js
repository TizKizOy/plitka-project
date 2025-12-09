import { useState, useEffect } from "react";
import { useApi } from "../../../shared/hooks/useApi";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const { isLoading, error: apiError, getData } = useApi();

  const getOrders = async () => {
    try {
      const data = await getData("/order");
      setOrders(data);
    } catch (err) {
      console.error("Ошибка при получении данных:", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return { orders, setOrders, isLoading, error: apiError };
};

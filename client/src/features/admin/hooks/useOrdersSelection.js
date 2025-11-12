import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../shared/utils/apiConfig";

export const useOrdersSelection = (setOrders) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isSelectedOrderVisible, setIsSelectedOrderVisible] = useState(false);

  useEffect(() => {
    setIsSelectedOrderVisible(selectedOrders.length > 0);
  }, [selectedOrders]);

  const handleCheckboxChange = (e, orderId) => {
    e.stopPropagation();
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const onSetStatusClosed = async () => {
    try {
      await Promise.all(
        selectedOrders.map((orderId) =>
          axios.put(
            `${API_URL}/v1/order/${orderId}`,
            { fkIdStatus: 1 },
            { withCredentials: true }
          )
        )
      );
      setOrders((el) =>
        el.map((order) =>
          selectedOrders.includes(order.pkIdOrder)
            ? { ...order, status: "Активно" }
            : order
        )
      );
      setSelectedOrders([]);
    } catch (error) {
      console.error("Ошибка при блокировке:", error);
    }
  };

  const onSetStatusActive = async () => {
    try {
      await Promise.all(
        selectedOrders.map((orderId) =>
          axios.put(
            `${API_URL}/v1/order/${orderId}`,
            { fkIdStatus: 2 },
            { withCredentials: true }
          )
        )
      );
      setOrders((el) =>
        el.map((order) =>
          selectedOrders.includes(order.pkIdOrder)
            ? { ...order, status: "Закрыто" }
            : order
        )
      );
      setSelectedOrders([]);
    } catch (error) {
      console.error("Ошибка при активации:", error);
    }
  };

  const onDeleteOrder = async () => {
    try {
      await Promise.all(
        selectedOrders.map((orderId) =>
          axios.delete(`${API_URL}/v1/order/${orderId}`, {
            withCredentials: true,
          })
        )
      );
      setOrders((prev) =>
        prev.filter((order) => !selectedOrders.includes(order.pkIdOrder))
      );
      setSelectedOrders([]);
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const handleCloseToolbar = () => {
    setIsSelectedOrderVisible(false);
    setSelectedOrders([]);
  };

  return {
    selectedOrders,
    isSelectedOrderVisible,
    handleCheckboxChange,
    onSetStatusClosed,
    onSetStatusActive,
    onDeleteOrder,
    handleCloseToolbar,
  };
};

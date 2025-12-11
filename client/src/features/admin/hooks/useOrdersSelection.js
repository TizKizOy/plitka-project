import { useState, useEffect } from "react";
import { useApi } from "../../../shared/hooks/useApi";

export const useOrdersSelection = (setOrders, highlightRows) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isSelectedOrderVisible, setIsSelectedOrderVisible] = useState(false);

  const { isLoading, error: apiError, putData, deleteData } = useApi();

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

  const onSetStatusActive = async () => {
    try {
      await Promise.all(
        selectedOrders.map((orderId) =>
          putData(`/order/${orderId}`, { fkIdStatus: 1 })
        )
      );
      setOrders((el) =>
        el.map((order) =>
          selectedOrders.includes(order.pkIdOrder)
            ? { ...order, statusName: "Активно" }
            : order
        )
      );
      highlightRows(selectedOrders);
      setSelectedOrders([]);
    } catch (error) {
      console.error("Ошибка при блокировке:", error);
    }
  };

  const onSetStatusClosed = async () => {
    try {
      await Promise.all(
        selectedOrders.map((orderId) =>
          putData(`/order/${orderId}`, { fkIdStatus: 2 })
        )
      );
      setOrders((el) =>
        el.map((order) =>
          selectedOrders.includes(order.pkIdOrder)
            ? { ...order, statusName: "Закрыто" }
            : order
        )
      );
      highlightRows(selectedOrders);
      setSelectedOrders([]);
    } catch (error) {
      console.error("Ошибка при активации:", error);
    }
  };

  const onDeleteOrder = async () => {
    highlightRows(selectedOrders, "delete");
    setTimeout(async () => {
      try {
        await Promise.all(
          selectedOrders.map((orderId) => deleteData(`/order/${orderId}`))
        );
        setOrders((prev) =>
          prev.filter((order) => !selectedOrders.includes(order.pkIdOrder))
        );
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      } finally {
        setSelectedOrders([]);
      }
    }, 500);
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
    isLoading,
    apiError,
  };
};

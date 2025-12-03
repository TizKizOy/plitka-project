import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../shared/utils/apiConfig";
import { useToken } from "../../../shared/hooks/useToken";

export const useOrdersSelection = (setOrders, highlightRows) => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [isSelectedOrderVisible, setIsSelectedOrderVisible] = useState(false);
  const token = useToken();

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
      {console.log(selectedOrders)}
      await Promise.all(
        selectedOrders.map((orderId) =>
          axios.put(
            `${API_URL}/order/${orderId}`,
            { fkIdStatus: 1 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          )
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
          axios.put(
            `${API_URL}/order/${orderId}`,
            { fkIdStatus: 2 },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          )
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
          selectedOrders.map((orderId) =>
            axios.delete(`${API_URL}/order/${orderId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            })
          )
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
  };
};

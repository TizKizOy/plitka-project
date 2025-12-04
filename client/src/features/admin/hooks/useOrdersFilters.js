import { useState, useEffect } from "react";
import { useToken } from "../../../shared/hooks/useToken";
import api from "../../../shared/hooks/useAxios";

export const useOrdersFilters = (setOrders) => {
  const [filters, setFilters] = useState({
    status: "",
    dateRange: "Все",
    searchText: "",
  });
  const token = useToken();

  const fetchOrders = async () => {
    try {
      const params = {};
      if (filters.status) params.status = filters.status;

      if (filters.dateRange) {
        const now = new Date();
        let startDate, endDate;

        switch (filters.dateRange) {
          case "Текущий день":
            startDate = new Date(now.setHours(0, 0, 0, 0));
            endDate = new Date(now.setHours(23, 59, 59, 999));
            break;
          case "Текущая неделя":
            const currentDay = now.getDay();
            const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
            startDate = new Date(now);
            startDate.setDate(now.getDate() + diffToMonday);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 999);
            break;
          case "Текущий месяц":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;
          case "Ранее":
            endDate = new Date(now.getFullYear(), now.getMonth(), 0);
            startDate = null;
            break;
          case "Все":
            startDate = null;
            endDate = null;
            break;
          default:
            startDate = null;
            endDate = null;
        }

        if (startDate) params.startDate = startDate.toISOString().split("T")[0];
        if (endDate) params.endDate = endDate.toISOString().split("T")[0];
      }

      if (filters.searchText) params.searchText = filters.searchText;

      const response = await api.get("/order", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(response.data);
    } catch (error) {
      console.error("Ошибка при фильтрации заказов:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    let status;
    if (selectedStatus === "Все") {
      status = null;
    } else {
      status = selectedStatus === "Активные заявки" ? "Активно" : "Закрыто";
    }
    setFilters((prev) => ({ ...prev, status }));
  };

  const handleDateRangeChange = (e) => {
    setFilters((prev) => ({ ...prev, dateRange: e.target.value }));
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, searchText: e.target.value }));
  };

  return {
    filters,
    fetchOrders,
    handleStatusChange,
    handleDateRangeChange,
    handleSearchChange,
  };
};

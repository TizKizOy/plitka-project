import { useState } from "react";
import axios from "axios";
import services from "../../../shared/data/servicesForm.json";
import { API_URL } from "../../../shared/utils/apiConfig";
export const useEditForm = ({
  order,
  initialServiceName,
  onClose,
  setOrders,
  fetchOrders,
}) => {
  const [formData, setFormData] = useState(() => {
    if (!order) {
      return {
        firstName: "",
        phone: "",
        serviceName: "",
        location: "",
        comment: "",
        status: "Активно",
      };
    }
    const initialServiceLabel = services.find(
      (s) => s.value === order.serviceName
    )?.label;
    return {
      ...order,
      serviceName: initialServiceLabel || order.serviceName || "",
    };
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const selectedService = services.find(
        (s) => s.label === formData.serviceName
      );
      const fkIdService = selectedService ? selectedService.value : "";
      const reqData = {
        pkIdOrder: formData.pkIdOrder,
        firstName: formData.firstName,
        phone: formData.phone,
        location: formData.location,
        comment: formData.comment,
        fkIdService: fkIdService,
        fkIdStatus: formData.status === "Активно" ? "1" : "2",
      };
      const response = await axios.put(
        `${API_URL}/v1/order/${order.pkIdOrder}`,
        reqData,
        { withCredentials: true }
      );
      setOrders((prev) =>
        prev.map((o) =>
          o.pkIdOrder === order.pkIdOrder ? { ...o, ...formData } : o
        )
      );
      await fetchOrders();
      onClose();
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };
  return { formData, handleChange, handleSubmit };
};

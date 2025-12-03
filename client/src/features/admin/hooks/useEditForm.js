import { useState } from "react";
import axios from "axios";
import services from "../../../shared/data/servicesForm.json";
import { API_URL } from "../../../shared/utils/apiConfig";
import { useToken } from "../../../shared/hooks/useToken";

export const useEditForm = ({
  order,
  initialServiceName,
  onClose,
  setOrders,
  fetchOrders,
  highlightRows,
}) => {
  const [formData, setFormData] = useState(() => {
    if (!order) {
      return {
        firstName: "",
        phone: "",
        serviceName: "",
        location: "",
        comment: "",
        statusName: "",
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

  const initialFormData = {
    firstName: order?.firstName || "",
    phone: order?.phone || "",
    serviceName: order
      ? services.find((s) => s.value === order.serviceName)?.label ||
        order.serviceName ||
        ""
      : "",
    location: order?.location || "",
    comment: order?.comment || "",
    statusName: order?.statusName || "",
  };

  const [changedFields, setChangedFields] = useState({});
  const token = useToken();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };

    const isChanged = newFormData[name] !== initialFormData[name];
    setChangedFields((prev) => ({ ...prev, [name]: isChanged }));

    setFormData(newFormData);
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
        fkIdStatus: formData.statusName === "Активно" ? "1" : "2",
      };
      const response = await axios.put(
        `${API_URL}/order/${order.pkIdOrder}`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setOrders((prev) =>
        prev.map((o) =>
          o.pkIdOrder === order.pkIdOrder ? { ...o, ...formData } : o
        )
      );
      highlightRows([order.pkIdOrder]);
      // await fetchOrders();
      onClose();
      setChangedFields({});
    } catch (error) {
      console.error("Ошибка при сохранении:", error);
    }
  };

  return { formData, handleChange, handleSubmit, changedFields };
};

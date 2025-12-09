import { useState } from "react";
import { validateForm } from "../utils/validation";
import { useApi } from "../../../shared/hooks/useApi";

export const useApplicationForm = () => {
  const [data, setData] = useState({
    firstName: "",
    phone: "",
    location: "",
    fkIdService: "",
    fkIdStatus: "1",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    phone: "",
    location: "",
    fkIdService: "",
    fkIdStatus: "1",
  });

  const [appFormIsVisible, setAppFormIsVisible] = useState(false);
  const [messageIsVisible, setMessageIsVisible] = useState(false);

  const { isLoading, error: apiError, postData } = useApi();

  const handleInputChange = (e, name) => {
    setData({ ...data, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: newErrors } = validateForm(data);
    setErrors(newErrors);

    if (isValid) {
      try {
        await postData("/order", data);
        setData({
          firstName: "",
          phone: "",
          location: "",
          fkIdService: "",
          fkIdStatus: "1",
        });
        setAppFormIsVisible(false);
        setMessageIsVisible(true);
      } catch (err) {
        console.error("Ошибка:", err);
      }
    }
  };

  return {
    data,
    errors,
    appFormIsVisible,
    messageIsVisible,
    isLoading,
    apiError,
    setAppFormIsVisible,
    setMessageIsVisible,
    handleInputChange,
    handleSubmit,
  };
};

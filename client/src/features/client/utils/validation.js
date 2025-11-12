export const validateForm = (data) => {
  let isValid = true;
  const newErrors = {
    firstName: "",
    phone: "",
    location: "",
    fkIdService: "",
  };

  if (!data.firstName.trim()) {
    newErrors.firstName = "Имя обязательно для заполнения";
    isValid = false;
  } else if (!/^[а-яА-ЯёЁa-zA-Z-]+$/.test(data.firstName)) {
    newErrors.firstName = "Имя может содержать только буквы и дефис";
    isValid = false;
  }

  if (!data.phone.trim()) {
    newErrors.phone = "Телефон обязателен для заполнения";
    isValid = false;
  } else if (!/^(\+375\d{9}|\+7\d{10}|\+48\d{9})$/.test(data.phone)) {
    newErrors.phone =
      "Некорректный формат телефона. Примеры: +375291234567 (Беларусь)";
    isValid = false;
  }

  if (!data.location.trim()) {
    newErrors.location = "Месторасположение обязательно для заполнения";
    isValid = false;
  } 

  if (!data.fkIdService) {
    newErrors.fkIdService = "Услуга обязательна для выбора";
    isValid = false;
  }

  return { isValid, errors: newErrors };
};

exports.validateOrderData = (data) => {
  const errors = {};

  if (!data) {
    return {
      isValid: false,
      errors: { general: "Тело запроса не может быть пустым" },
    };
  }

  if (!data.firstName || !data.firstName.trim()) {
    errors.firstName = "Имя обязательно для заполнения";
  } else if (!/^[а-яА-ЯёЁa-zA-Z-]+$/.test(data.firstName)) {
    errors.firstName = "Имя может содержать только буквы и дефис";
  } else if (data.firstName.length > 128) {
    errors.firstName = "Имя не должно превышать 128 символов";
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = "Телефон обязателен для заполнения";
  } else if (!/^(\+375\d{9}|\+7\d{10}|\+48\d{9})$/.test(data.phone)) {
    errors.phone =
      "Некорректный формат телефона. Примеры: +375291234567 (Беларусь)";
  } else if (data.phone.length > 32) {
    errors.phone = "Телефон не должен превышать 32 символа";
  }

  if (!data.location || !data.location.trim()) {
    errors.location = "Месторасположение обязательно для заполнения";
  } else if (data.location.length > 256) {
    errors.location = "Месторасположение не должно превышать 256 символов";
  }

  if (data.comment && data.comment.length > 1024) {
    errors.comment = "Комментарий не должен превышать 1024 символа";
  }

  if (!data.fkIdService || isNaN(Number(data.fkIdService))) {
    errors.fkIdService = "Услуга обязательна для выбора";
  }

  if (data.fkIdStatus && isNaN(Number(data.fkIdStatus))) {
    errors.fkIdStatus = "Статус должен быть числом";
  }

  if (data.pkIdOrder) {
    if (typeof data.pkIdOrder !== "string") {
      errors.pkIdOrder = "ID заказа должен быть строкой";
    } else if (data.pkIdOrder.length > 256) {
      errors.pkIdOrder = "ID заказа не должен превышать 256 символов";
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};

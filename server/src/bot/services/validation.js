function validateOrderData(data) {
  const errors = {};

  if (data.firstName !== undefined) {
    if (!data.firstName.trim()) {
      errors.firstName = "❌ Имя обязательно для заполнения.";
    } else if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(data.firstName)) {
      errors.firstName =
        "❌ Имя может содержать только буквы, пробелы и дефис.";
    } else if (data.firstName.length > 128) {
      errors.firstName = "❌ Имя не должно превышать 128 символов.";
    }
  }

  if (data.phone !== undefined) {
    if (!data.phone.trim()) {
      errors.phone = "❌ Телефон обязателен для заполнения.";
    } else if (!/^(\+375\d{9})$/.test(data.phone)) {
      errors.phone = "❌ Некорректный формат телефона. Пример: +375291234567.";
    } else if (data.phone.length > 32) {
      errors.phone = "❌ Телефон не должен превышать 32 символа.";
    }
  }

  if (data.location !== undefined) {
    if (!data.location.trim()) {
      errors.location = "❌ Месторасположение обязательно для заполнения.";
    } else if (data.location.length > 256) {
      errors.location =
        "❌ Месторасположение не должно превышать 256 символов.";
    }
  }

  if (data.comment !== undefined && data.comment.length > 1024) {
    errors.comment = "❌ Комментарий не должен превышать 1024 символа.";
  }

  if (data.fkIdService !== undefined) {
    if (!data.fkIdService) {
      errors.fkIdService = "❌ Услуга обязательна для выбора.";
    } else if (isNaN(Number(data.fkIdService))) {
      errors.fkIdService = "❌ Некорректный идентификатор услуги.";
    }
  }

  if (data.fkIdStatus !== undefined && isNaN(Number(data.fkIdStatus))) {
    errors.fkIdStatus = "❌ Некорректный идентификатор статуса.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors,
  };
}

module.exports = { validateOrderData };

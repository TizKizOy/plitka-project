export const validateForm = (data) => {
  let isValid = true;
  const newErrors = {
    login: "",
    password: "",
  };

  if (!data.login.trim()) {
    newErrors.login = "Логин обязателен для заполнения";
    isValid = false;
  }

  if (!data.password.trim()) {
    newErrors.password = "Пароль обязателен для заполнения";
    isValid = false;
  } else if (data.password.trim().length < 3) {
    newErrors.password = "Пароль должен содержать не менее 3 символов";
    isValid = false;
  }

  return { isValid, errors: newErrors };
};

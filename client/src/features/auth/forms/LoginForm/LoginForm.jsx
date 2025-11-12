import { FiEye, FiEyeOff } from "react-icons/fi";
import style from "./LoginForm.module.css";
import { useLoginForm } from "../../hooks/useLoginForm";

const LoginForm = () => {
  const {
    showPassword,
    data,
    error,
    togglePasswordVisibility,
    handlerInputChange,
    handleSubmit,
  } = useLoginForm();

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h1 className={style.form__title}>
        TileHaus
        <br />
        Системный Вход
      </h1>

      {error && <p className={style.error}>{error}</p>}

      <div className={style.form__group}>
        <input
          className={style.form__input}
          onChange={(e) => handlerInputChange(e, "login")}
          placeholder="Введите логин"
          type="text"
          id="login"
          name="login"
          value={data.login}
          maxLength={128}
        />
      </div>

      <div className={style.form__group}>
        <div className={style.passwordContainer}>
          <input
            className={style.form__input}
            onChange={(e) => handlerInputChange(e, "password")}
            placeholder="Введите пароль"
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={data.password}
            maxLength={128}
          />
          <span className={style.eyeIcon} onClick={togglePasswordVisibility}>
            {showPassword ? (
              <FiEyeOff color="white" size={20} />
            ) : (
              <FiEye color="white" size={20} />
            )}
          </span>
        </div>
      </div>

      <button className={style.form__button} type="submit">
        Войти
      </button>
    </form>
  );
};

export default LoginForm;

import style from "./ExitButton.module.css";
import { useLogout } from "../../../hooks/useLogout";

const ExitButton = () => {
  const { handleLogout, error } = useLogout();

  return (
    <>
      {error && <p className={style.error}>{error}</p>}
      <button onClick={handleLogout} className={style.exit}>
        Выйти
      </button>
    </>
  );
};

export default ExitButton;

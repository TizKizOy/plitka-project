import { Link } from "react-router-dom";
import style from "./NotFound.module.css";

export const NotFound = () => {
  return (
    <div className={style.wrap}>
      <h1 className={style.title}>404</h1>
      <h3 className={style.subtitle}>Что-то пошло не так!</h3>
      <p className={style.text}>
        Страница, которую вы запрашиваете, не существует. Возможно она устарела,
        была удалена, или был введен неверный адрес в адресной строке.
      </p>
      <div className={style.link_wrap}>
        <Link to="/">Главная</Link>
      </div>
    </div>
  );
};

import style from "./FooterButton.module.css";
import Icon from "../../../../../shared/components/Icon";

const FooterButton = ({ children, href }) => {
  return (
    <a href={href} className={style.footButton}>
      {children}
    </a>
  );
};

export default FooterButton;

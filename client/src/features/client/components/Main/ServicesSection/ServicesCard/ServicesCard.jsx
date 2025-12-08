import style from "./ServicesCard.module.css";
import Icon from "../../../../../../shared/components/Icon";

const ServicesCard = ({ icon, title, text, sizeClass }) => {
  return (
    <div className={style.card}>
      <div className={style.iconWrap}>
        <Icon name={icon} className={style[sizeClass]} />
      </div>
      <h4 className={style.title}>{title}</h4>
      <ul className={style.list}>
        {text.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesCard;

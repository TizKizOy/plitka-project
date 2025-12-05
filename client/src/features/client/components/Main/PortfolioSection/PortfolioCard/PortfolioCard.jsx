import style from "./PortfolioCard.module.css";

const PortfolioCard = ({ imageSmall, imageLarge, title, text }) => {
  console.log(imageSmall, imageLarge);
  return (
    <div className={style.card}>
      <img
        src={imageLarge}
        srcSet={`${imageSmall} 991w, ${imageLarge} 1200w`}
        sizes="(max-width: 991px) 100vw, 1200px"
        alt={title}
        loading="lazy"
        className={style.image}
      />
      <div className={style.textContainer}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.subtitle}>{text}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;

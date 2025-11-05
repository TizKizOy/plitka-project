import style from "./PortfolioCards.module.css";
import portfolioData from "../../../../data/portfolioData";
import PortfolioCard from "../PortfolioCard/PortfolioCard";

const PortfolioCards = () => {
  return (
    <div className={style.cardsContainer}>
      {portfolioData.map((el) => (
        <PortfolioCard
          key={el.id}
          img={el.image}
          title={el.title}
          text={el.text}
        />
      ))}
    </div>
  );
};

export default PortfolioCards;

import { useEffect, useRef } from "react";
import style from "./PortfolioSection.module.css";
import PortfolioCards from "./PortfolioCards/PortfolioCards";

const PortfolioSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(style.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);
    if (cardsContainerRef.current) observer.observe(cardsContainerRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
      if (cardsContainerRef.current)
        observer.unobserve(cardsContainerRef.current);
    };
  }, []);

  return (
    <div id="portfolioSection" className={style.container}>
      <div className={style.textContainer}>
        <h3 ref={titleRef} className={style.title}>
          результат и гарантия
        </h3>
        <h2 ref={subtitleRef} className={style.subtitle}>
          ПРИМЕРЫ НАШИХ РАБОТ
        </h2>
      </div>
      <div ref={cardsContainerRef} className={style.portfolioCardsContainer}>
        <PortfolioCards />
      </div>
    </div>
  );
};

export default PortfolioSection;

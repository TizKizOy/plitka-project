import { useEffect, useRef } from "react";
import style from "./ServicesSection.module.css";
import ServicesCards from "./ServicesCards/ServicesCards";

const ServicesSection = () => {
  const containerRef = useRef(null);
  const servicesCardsRef = useRef(null);

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

    if (containerRef.current) observer.observe(containerRef.current);
    if (servicesCardsRef.current) observer.observe(servicesCardsRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      if (servicesCardsRef.current)
        observer.unobserve(servicesCardsRef.current);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} id="servicesSection" className={style.container}>
        <h3 className={style.title}>наши услуги</h3>
        <h2 className={style.subtitle}>МЫ ПРЕДЛАГАЕМ ЛУЧШИЕ РЕШЕНИЯ</h2>
      </div>
      <div ref={servicesCardsRef} className={style.servicesCardsContainer}>
        <ServicesCards />
      </div>
    </>
  );
};

export default ServicesSection;

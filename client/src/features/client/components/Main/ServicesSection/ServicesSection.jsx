import { useEffect, useRef } from "react";
import style from "./ServicesSection.module.css";
import ServicesCards from "./ServicesCards/ServicesCards";

const ServicesSection = () => {
  return (
    <>
      <div className={style.container}>
        <h3 className={style.title}>наши услуги</h3>
        <h2 className={style.subtitle}>МЫ ПРЕДЛАГАЕМ ЛУЧШИЕ РЕШЕНИЯ</h2>
      </div>
      <div>
        <ServicesCards />
      </div>
    </>
  );
};

export default ServicesSection;

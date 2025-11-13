import { useEffect, useRef } from "react";
import style from "./AboutSection.module.css";
import AboutUsLeft from "/image/AboutUsLeft.webp";
import AboutUsCenter from "/image/AboutUsCenter.webp";
import AboutUsRight from "/image/AboutUsRight.webp";

const AboutSection = () => {
  const imagesRef = useRef([]);

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

    imagesRef.current.forEach((img) => {
      if (img) observer.observe(img);
    });

    return () => {
      imagesRef.current.forEach((img) => {
        if (img) observer.unobserve(img);
      });
    };
  }, []);

  return (
    <div id="aboutSection" className={style.container}>
      <div className={style.textContainer}>
        <h3 className={style.title}>о нас</h3>
        <h2 className={style.subtitle}>СОЗДАЁМ УЮТНЫЕ УЧАСТКИ ДЛЯ ОТДЫХА</h2>
        <p className={style.description}>
          За годы работы компания реализовала множество проектов, завоевала
          доверие клиентов
        </p>
      </div>
      <div className={style.imagesContainer}>
        <img
          ref={(el) => (imagesRef.current[0] = el)}
          className={style.image}
          src={AboutUsLeft}
          alt="Уютный дом слева"
        />
        <img
          ref={(el) => (imagesRef.current[1] = el)}
          className={style.image}
          src={AboutUsCenter}
          alt="Уютный дом по центру"
        />
        <img
          ref={(el) => (imagesRef.current[2] = el)}
          className={style.image}
          src={AboutUsRight}
          alt="Уютный дом справа"
        />
      </div>
    </div>
  );
};

export default AboutSection;

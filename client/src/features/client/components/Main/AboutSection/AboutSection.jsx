import { useEffect, useRef } from "react";
import style from "./AboutSection.module.css";

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
          loading="lazy"
          src="/image/AboutUsLeft.webp"
          srcSet="/images/small/AboutUsLeft.webp 991w, /images/large/AboutUsLeft.webp 1200w"
          sizes="(max-width: 991px) 100vw, 1200px"
          alt="Уютный дом слева"
        />
        <img
          ref={(el) => (imagesRef.current[1] = el)}
          className={style.image}
          loading="lazy"
          src="/image/AboutUsCenter.webp"
          srcSet="/images/small/AboutUsCenter.webp 991w, /images/large/AboutUsCenter.webp 1200w"
          sizes="(max-width: 991px) 100vw, 1200px"
          alt="Уютный дом по центру"
        />
        <img
          ref={(el) => (imagesRef.current[2] = el)}
          className={style.image}
          loading="lazy"
          src="/image/AboutUsRight.webp"
          srcSet="/images/small/AboutUsRight.webp 991w, /images/large/AboutUsRight.webp 1200w"
          sizes="(max-width: 991px) 100vw, 1200px"
          alt="Уютный дом справа"
        />
      </div>
    </div>
  );
};

export default AboutSection;

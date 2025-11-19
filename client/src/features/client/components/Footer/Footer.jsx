import { useEffect, useRef } from "react";
import style from "./Footer.module.css";
import FooterButton from "./FooterButton/FooterButton";
import footerButtonsData from "../../data/footerButtonsData";
import NavList from "../../../../shared/components/NavList/NavList";
import navItems from "../../data/navItems.json";

const Footer = () => {
  const buttonRefs = useRef([]);

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

    buttonRefs.current.forEach((button) => {
      if (button) observer.observe(button);
    });

    return () => {
      buttonRefs.current.forEach((button) => {
        if (button) observer.unobserve(button);
      });
    };
  }, []);

  return (
    <div id="footer" className={style.footerContainer}>
      <h3 className={style.title} onClick={() => location.reload()}>
        TILEHAUS
      </h3>
      <NavList
        items={navItems}
        listStyle={style.list}
        itemStyle={style.listItem}
        linkStyle={style.listLink}
      />
      <div className={style.footerButtons}>
        {footerButtonsData.map((button, index) => (
          <div
            key={index}
            ref={(el) => (buttonRefs.current[index] = el)}
            className={style.footerButton}
          >
            <FooterButton href={button.href}>{button.icon}</FooterButton>
          </div>
        ))}
      </div>
      <p className={style.copyright}>
        © 2025 ShabunevichProduction Все права защищены
      </p>
    </div>
  );
};

export default Footer;

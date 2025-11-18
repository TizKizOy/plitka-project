import style from "./PortfolioSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import PortfolioCard from "./PortfolioCard/PortfolioCard";
import portfolioData from "../../../data/portfolioData.json";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PortfolioSection = () => {
  return (
    <div id="portfolioSection" className={style.container}>
      <div className={style.textContainer}>
        <h3 className={style.title}>результат и гарантия</h3>
        <h2 className={style.subtitle}>ПРИМЕРЫ НАШИХ РАБОТ</h2>
      </div>
      <div className={style.sliderContainer}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={2}
          centeredSlides={false}
          centeredSlidesBounds={true}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            577: {
              slidesPerView: 2,
            },
          }}
          navigation={{
            nextEl: `.${style.customNavButtonNext}`,
            prevEl: `.${style.customNavButtonPrev}`,
          }}
        >
          {portfolioData.map((el) => (
            <SwiperSlide
              key={el.id}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <PortfolioCard img={el.image} title={el.title} text={el.text} />
            </SwiperSlide>
          ))}

          <div className={style.customNavButtonPrev}>
            <MdKeyboardArrowLeft size={33} />
          </div>
          <div className={style.customNavButtonNext}>
            <MdKeyboardArrowRight size={33} />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default PortfolioSection;

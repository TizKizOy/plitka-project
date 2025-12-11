import Nav from "./Nav/Nav";
import TopSection from "./TopSection/TopSection";
import style from "./Header.module.css";
import StatsSection from "./StatsSection/StatsSection";
import BackgroundLayout from "../../../../shared/components/BackgroundLayout/BackgroundLayout";

const Header = ({ onClick }) => {
  return (
    <BackgroundLayout>
      <Nav />
      <div className={style.content}>
        <div className={style.animation}>
          <TopSection onClick={onClick} />
        </div>
        <StatsSection />
      </div>
    </BackgroundLayout>
  );
};

export default Header;

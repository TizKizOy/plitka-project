import Nav from "./Nav/Nav";
import TopSection from "./TopSection/TopSection";
import style from "./Header.module.css";
import StatsSection from "./StatsSection/StatsSection";
import BackgroundLayout from "../../../../shared/components/BackgroundLayout/BackgroundLayout";

const Header = ({ onClick }) => {
  return (
    <BackgroundLayout>
      <div className={style.content}>
        <Nav />
        <div className={style.animation}>
          <TopSection onClick={onClick} />
        </div>
        <StatsSection />
      </div>
    </BackgroundLayout>
  );
};

export default Header;

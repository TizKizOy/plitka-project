import { ParallaxBanner, ParallaxProvider } from "react-scroll-parallax";
import styles from "./BackgroundLayout.module.css";

const BackgroundLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <ParallaxProvider>
        <ParallaxBanner
          layers={[
            {
              image: "/images/large/BackImg.webp",
              speed: -10,
            },
          ]}
          className={styles.backImage}
        >
          <div className={styles.overlay}></div>
          <div className={styles.content}>{children}</div>
        </ParallaxBanner>
      </ParallaxProvider>
    </div>
  );
};

export default BackgroundLayout;

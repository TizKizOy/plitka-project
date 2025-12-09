import React from "react";
import style from "./LoaderOverlay.module.css";

const LoaderOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={style.overlay}>
      <div className={style.spinner}></div>
    </div>
  );
};

export default LoaderOverlay;

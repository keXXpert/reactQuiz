import React from "react";
import myCSS from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={myCSS.center}>
      <div className={myCSS["lds-roller"]}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;

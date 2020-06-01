import React from "react";
import myCSS from "./Button.module.css";

const Button = ({ onClick, disabled, children, type }) => {
    const cls = [
        myCSS.Button,
        myCSS[type]
    ]

  return (
    <button onClick={onClick} className={cls.join(' ')} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

import React from "react";
import myCSS from "./Drawer.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";

const links = [1, 2, 3];

const Drawer = ({ isOpen, onMenuClose }) => {
  const cls = [myCSS.Drawer];

  if (!isOpen) cls.push(myCSS.close);

  return (
    <>
      <nav className={cls.join(" ")}>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a>Link {link}</a>
            </li>
          ))}
        </ul>
      </nav>
      {isOpen && <Backdrop onClick={onMenuClose}/>}
    </>
  );
};

export default Drawer;

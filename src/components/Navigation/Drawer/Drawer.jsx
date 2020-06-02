import React from "react";
import myCSS from "./Drawer.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "List", exact: true },
  { to: "/auth", label: "Login", exact: false },
  { to: "/quiz-creator", label: "Create quiz", exact: false },
];

const Drawer = ({ isOpen, onMenuClose }) => {
  const cls = [myCSS.Drawer];

  if (!isOpen) cls.push(myCSS.close);

  return (
    <>
      <nav className={cls.join(" ")}>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.to}
                exact={link.exact}
                activeClassName={myCSS.active}
                onClick={onMenuClose}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {isOpen && <Backdrop onClick={onMenuClose} />}
    </>
  );
};

export default Drawer;

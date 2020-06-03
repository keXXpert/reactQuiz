import React from "react";
import myCSS from "./Drawer.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom";



const Drawer = ({ isOpen, onMenuClose, isAuthed }) => {
  const cls = [myCSS.Drawer];
  if (!isOpen) cls.push(myCSS.close);
  
  const links = [{ to: "/", label: "Quizes List", exact: true }]
  if (isAuthed) {
    links.push({ to: "/quiz-creator", label: "Create quiz", exact: false })
    links.push({ to: "/logout", label: "Logout", exact: false })
  } else {
    links.push({ to: "/auth", label: "Login", exact: false })
  }

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

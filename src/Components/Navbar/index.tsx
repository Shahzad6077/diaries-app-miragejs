import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import "../index.css";

type NavbarProps = {};

const NavBar: FC<NavbarProps> = () => {
  return (
    <nav>
      <h1>Diary App</h1>
      <ul>
        <li>
          <NavLink end to="/">
            Diaries
          </NavLink>
        </li>
        <li>
          <NavLink to="/custom-path">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
